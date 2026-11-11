-- Apply after COMPLETE_DB_SETUP.sql on new databases; may also upgrade existing databases.
-- This migration deliberately replaces policies on these four application tables.
begin;
alter table public.posts add column if not exists topic text not null default '实践复盘';
alter table public.posts drop constraint if exists posts_content_length;
alter table public.posts add constraint posts_content_length check (char_length(btrim(content)) between 1 and 2000) not valid;
alter table public.posts drop constraint if exists posts_topic_allowed;
alter table public.posts add constraint posts_topic_allowed check (topic in ('实践复盘','工具问答','项目组队','资源分享')) not valid;
alter table public.comments drop constraint if exists comments_content_length;
alter table public.comments add constraint comments_content_length check (char_length(btrim(content)) between 1 and 500) not valid;
alter table public.comments drop constraint if exists comments_post_id_fkey;
alter table public.comments add constraint comments_post_id_fkey foreign key(post_id) references public.posts(id) on delete cascade;
alter table public.post_likes drop constraint if exists post_likes_post_id_fkey;
alter table public.post_likes add constraint post_likes_post_id_fkey foreign key(post_id) references public.posts(id) on delete cascade;

-- Remove legacy permissive policies (Postgres combines permissive policies with OR).
do $$ declare p record; begin
 for p in select tablename,policyname from pg_policies where schemaname='public' and tablename in ('posts','comments','post_likes','profiles') loop
 execute format('drop policy %I on public.%I',p.policyname,p.tablename);
 end loop;
end $$;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.post_likes enable row level security;
alter table public.profiles enable row level security;
create policy posts_read on public.posts for select to anon,authenticated using(true);
create policy posts_create on public.posts for insert to authenticated with check(auth.uid()=user_id);
create policy posts_delete on public.posts for delete to authenticated using(auth.uid()=user_id);
create policy comments_read on public.comments for select to anon,authenticated using(true);
create policy comments_create on public.comments for insert to authenticated with check(auth.uid()=user_id);
create policy comments_delete on public.comments for delete to authenticated using(auth.uid()=user_id);
create policy likes_read on public.post_likes for select to authenticated using(auth.uid()=user_id);
create policy likes_create on public.post_likes for insert to authenticated with check(auth.uid()=user_id);
create policy likes_delete on public.post_likes for delete to authenticated using(auth.uid()=user_id);
create policy profiles_read on public.profiles for select to anon,authenticated using(true);
-- Profiles are provisioned by the auth trigger. No public profile mutations yet.
revoke all on public.posts,public.comments,public.post_likes,public.profiles from anon,authenticated;
grant select on public.posts,public.comments,public.profiles to anon,authenticated;
grant select,delete on public.post_likes to authenticated;
grant delete on public.posts,public.comments to authenticated;
grant insert(user_id,content,topic) on public.posts to authenticated;
grant insert(user_id,post_id,content) on public.comments to authenticated;
grant insert(user_id,post_id) on public.post_likes to authenticated;

-- A full UUID avoids duplicate display-name failures and does not expose email prefixes.
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,username) values(new.id,'成员-'||new.id::text) on conflict(id) do nothing;
 return new;
end $$;
insert into public.profiles(id,username) select id,'成员-'||id::text from auth.users on conflict(id) do nothing;

create or replace function public.handle_new_like() returns trigger language plpgsql security definer set search_path='' as $$
begin update public.posts set likes_count=coalesce(likes_count,0)+1 where id=new.post_id; return new; end $$;
create or replace function public.handle_remove_like() returns trigger language plpgsql security definer set search_path='' as $$
begin update public.posts set likes_count=greatest(0,coalesce(likes_count,0)-1) where id=old.post_id; return old; end $$;
update public.posts p set likes_count=(select count(*) from public.post_likes l where l.post_id=p.id);

-- Rate limit writes by authenticated user; database enforcement also covers direct API calls.
create or replace function public.community_rate_limit() returns trigger language plpgsql security definer set search_path='' as $$
declare n integer; max_n integer; begin
 if auth.uid() is null or auth.uid()<>new.user_id then raise insufficient_privilege; end if;
 perform pg_advisory_xact_lock(hashtextextended(new.user_id::text||tg_table_name,0));
 if tg_table_name='posts' then
 select count(*) into n from public.posts where user_id=new.user_id and created_at>now()-interval '1 minute'; max_n:=5;
 else
 select count(*) into n from public.comments where user_id=new.user_id and created_at>now()-interval '1 minute'; max_n:=15;
 end if;
 if n>=max_n then raise exception 'rate limit exceeded'; end if;
 return new;
end $$;
drop trigger if exists posts_rate_limit on public.posts;
create trigger posts_rate_limit before insert on public.posts for each row execute function public.community_rate_limit();
drop trigger if exists comments_rate_limit on public.comments;
create trigger comments_rate_limit before insert on public.comments for each row execute function public.community_rate_limit();
revoke all on function public.handle_new_user(), public.handle_new_like(), public.handle_remove_like(), public.community_rate_limit() from public,anon,authenticated;
commit;

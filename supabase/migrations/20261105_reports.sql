-- Apply after 20261031_community.sql. Intake only; admins triage via trusted SQL console.
begin;
create table if not exists public.post_reports (
 id uuid primary key default gen_random_uuid(),
 post_id uuid not null references public.posts(id) on delete cascade,
 reporter_id uuid not null references auth.users(id) on delete cascade,
 reason text not null check(reason in ('垃圾广告','侵犯隐私','不友善内容','其他')),
 details text not null default '' check(char_length(details)<=500),
 status text not null default 'pending' check(status in ('pending','resolved','dismissed')),
 created_at timestamptz not null default now(),
 unique(post_id,reporter_id)
);
alter table public.post_reports enable row level security;
drop policy if exists reports_own_read on public.post_reports;
drop policy if exists reports_own_insert on public.post_reports;
create policy reports_own_read on public.post_reports for select to authenticated using(auth.uid()=reporter_id);
create policy reports_own_insert on public.post_reports for insert to authenticated with check(auth.uid()=reporter_id);
revoke all on public.post_reports from anon,authenticated;
grant select on public.post_reports to authenticated;
grant insert(post_id,reporter_id,reason,details) on public.post_reports to authenticated;
create index if not exists post_reports_queue on public.post_reports(status,created_at);
create or replace function public.report_rate_limit() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or auth.uid()<>new.reporter_id then raise insufficient_privilege; end if;
 perform pg_advisory_xact_lock(hashtextextended(new.reporter_id::text||'reports',0));
 if (select count(*) from public.post_reports where reporter_id=new.reporter_id and created_at>now()-interval '1 day')>=10 then raise exception 'report limit exceeded'; end if;
 return new;
end $$;
drop trigger if exists post_reports_rate_limit on public.post_reports;
create trigger post_reports_rate_limit before insert on public.post_reports for each row execute function public.report_rate_limit();
revoke all on function public.report_rate_limit() from public,anon,authenticated;
commit;

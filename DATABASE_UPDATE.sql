-- 1. 自动建档触发器 (确保所有登录方式都能生成 Profiles)
-- 创建处理函数
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1), '用户' || substr(new.id::text, 1, 6)),
    coalesce(new.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || new.id)
  );
  return new;
end;
$$;

-- 创建触发器
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. 点赞系统
-- 创建点赞表
create table if not exists public.post_likes (
  user_id uuid references auth.users not null,
  post_id uuid references public.posts not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, post_id)
);

-- 开启 RLS
alter table public.post_likes enable row level security;

-- 点赞策略
create policy "Public post_likes are viewable by everyone." on public.post_likes for select using (true);
create policy "Authenticated users can insert post_likes." on public.post_likes for insert with check (auth.uid() = user_id);
create policy "Authenticated users can delete post_likes." on public.post_likes for delete using (auth.uid() = user_id);

-- 3. 评论系统
-- 创建评论表
create table if not exists public.comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts not null,
  user_id uuid references auth.users not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 开启 RLS
alter table public.comments enable row level security;

-- 评论策略
create policy "Public comments are viewable by everyone." on public.comments for select using (true);
create policy "Authenticated users can insert comments." on public.comments for insert with check (auth.uid() = user_id);

-- 4. 自动维护点赞计数 (可选，但推荐，避免前端频繁 count)
-- 创建维护函数
create or replace function public.handle_new_like()
returns trigger
language plpgsql
security definer
as $$
begin
  update public.posts
  set likes_count = likes_count + 1
  where id = new.post_id;
  return new;
end;
$$;

create or replace function public.handle_remove_like()
returns trigger
language plpgsql
security definer
as $$
begin
  update public.posts
  set likes_count = likes_count - 1
  where id = old.post_id;
  return old;
end;
$$;

-- 创建触发器
drop trigger if exists on_like_created on public.post_likes;
create trigger on_like_created
  after insert on public.post_likes
  for each row execute procedure public.handle_new_like();

drop trigger if exists on_like_removed on public.post_likes;
create trigger on_like_removed
  after delete on public.post_likes
  for each row execute procedure public.handle_remove_like();

-- 5. 性能优化
-- 为 posts 的创建时间加索引，优化倒序排序
create index if not exists posts_created_at_idx on public.posts (created_at desc);
-- 为 comments 的 post_id 加索引，优化评论加载
create index if not exists comments_post_id_idx on public.comments (post_id, created_at asc);

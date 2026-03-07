-- 1. 用户档案表
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  website text,
  constraint username_length check (char_length(username) >= 3)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile." on public.profiles for insert with check (auth.uid() = id);

-- 2. 帖子表
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  likes_count integer default 0
);

alter table public.posts enable row level security;

create policy "Public posts are viewable by everyone." on public.posts for select using (true);
create policy "Authenticated users can insert posts." on public.posts for insert with check (auth.role() = 'authenticated');
create policy "Users can update own posts." on public.posts for update using (auth.uid() = user_id);

-- 3. 自动建档触发器 (确保所有登录方式都能生成 Profiles)
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
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. 点赞系统
create table if not exists public.post_likes (
  user_id uuid references auth.users not null,
  post_id uuid references public.posts not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, post_id)
);

alter table public.post_likes enable row level security;

create policy "Public post_likes are viewable by everyone." on public.post_likes for select using (true);
create policy "Authenticated users can insert post_likes." on public.post_likes for insert with check (auth.uid() = user_id);
create policy "Authenticated users can delete post_likes." on public.post_likes for delete using (auth.uid() = user_id);

-- 5. 评论系统
create table if not exists public.comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts not null,
  user_id uuid references auth.users not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.comments enable row level security;

create policy "Public comments are viewable by everyone." on public.comments for select using (true);
create policy "Authenticated users can insert comments." on public.comments for insert with check (auth.uid() = user_id);

-- 6. 自动维护点赞计数
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

drop trigger if exists on_like_created on public.post_likes;
create trigger on_like_created
  after insert on public.post_likes
  for each row execute procedure public.handle_new_like();

drop trigger if exists on_like_removed on public.post_likes;
create trigger on_like_removed
  after delete on public.post_likes
  for each row execute procedure public.handle_remove_like();

-- 7. 性能优化索引
create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists comments_post_id_idx on public.comments (post_id, created_at asc);

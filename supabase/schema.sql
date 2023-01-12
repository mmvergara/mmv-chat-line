
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  role text not null,
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);
create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id) ;


create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id,username)
  values (new.id,new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

insert into storage.buckets (id, name)
  values ('avatars', 'avatars');
-- Add Policies in storage bucket

CREATE TABLE rooms (
    id uuid PRIMARY KEY,
    name VARCHAR(255) NOT NULL CHECK (char_length(name) > 6),
    password VARCHAR(255) NOT NULL CHECK (char_length(name) > 6),
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE room_participants (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE room_messages (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
    message TEXT NOT NULL CHECK (char_length(message) > 6),
    created_at TIMESTAMP NOT NULL
);


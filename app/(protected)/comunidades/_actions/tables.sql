-- Tabela principal de comunidades
create table communities (
  id uuid primary key default uuid_generate_v4(),
  name varchar(255) not null unique,
  description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  creator_id uuid references auth.users(id) on delete cascade not null
);

-- Tabela de membros (Many-to-Many básico)
create table community_members (
  community_id uuid not null references communities(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  primary key (community_id, user_id)
);

-- Tabela de administradores (Many-to-Many com privilégios)
create table community_admins (
  community_id uuid not null references communities(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  primary key (community_id, user_id)
);
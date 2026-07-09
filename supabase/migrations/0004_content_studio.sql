-- Content Studio — admin-generated Instagram carousels + Meta ad concepts.
-- Written and read ONLY by the admin portal via the service role. No client access.

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  kind text not null,                  -- 'carousel' | 'ad'
  topic text not null,                 -- the angle/topic the piece was generated from
  payload jsonb not null,              -- slides / ad variants (structured, render-ready)
  created_at timestamptz not null default now()
);

create index if not exists content_items_created_idx on public.content_items (created_at desc);
create index if not exists content_items_kind_idx on public.content_items (kind);

alter table public.content_items enable row level security;
-- No policies: service-role only (admin portal). The public client never touches this.

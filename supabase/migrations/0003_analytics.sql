-- Find Your Place — first-party funnel analytics.
--
-- The Meta Pixel + CAPI already mirror funnel events to Facebook, but those aren't
-- queryable in our own admin. This table is the first-party record that powers
-- /admin/analytics: landing → quiz_start → per-question drop-off → quiz_complete →
-- paywall_view → checkout_start → purchase.
--
-- PRIVACY: structural signal ONLY. No email, no IP, no user-agent, and never any
-- AI-profile text. `session_id` is an anonymous, client-generated id used purely to
-- de-duplicate the funnel (one person answering three questions is one session, not
-- three visitors). Emails continue to live solely in `email_captures`.

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  name text not null,                 -- funnel event name (see lib/analytics allowlist)
  run_id text,                        -- the run this event belongs to, when one exists
  step_key text,                      -- quiz question key, for quiz_step events
  step_index integer,                 -- quiz question index (0-based), for drop-off
  source text,                        -- run source: quiz | ai-profile | words
  session_id text,                    -- anonymous client session id (funnel de-dup)
  path text,                          -- pathname the event fired on
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_name_idx on public.analytics_events (name);
create index if not exists analytics_events_created_idx on public.analytics_events (created_at);
create index if not exists analytics_events_name_created_idx on public.analytics_events (name, created_at);
create index if not exists analytics_events_session_idx on public.analytics_events (session_id);

alter table public.analytics_events enable row level security;
-- No client policies: written AND read via the service role only (the /api/track
-- ingest route and the admin dashboard). The public client never touches this table.

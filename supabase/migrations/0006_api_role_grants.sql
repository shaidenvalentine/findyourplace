-- The project has "Automatically expose new tables" disabled. Grant only the
-- API access each role needs; RLS remains the row-level enforcement layer.

grant usage on schema public to anon, authenticated, service_role;

grant all privileges on table
  public.locations,
  public.onboarding_runs,
  public.unlocked_results,
  public.email_captures,
  public.quiz_completions,
  public.profiles,
  public.creators,
  public.creator_clicks,
  public.creator_conversions,
  public.creator_payouts,
  public.analytics_events,
  public.content_items
to service_role;

grant select on table
  public.locations,
  public.quiz_completions
to anon, authenticated;

grant select, insert, update on table
  public.onboarding_runs,
  public.profiles,
  public.creators
to authenticated;

grant select on table
  public.unlocked_results,
  public.creator_clicks,
  public.creator_conversions,
  public.creator_payouts
to authenticated;

revoke all privileges on table
  public.email_captures,
  public.analytics_events,
  public.content_items
from anon, authenticated;

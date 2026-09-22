-- Lock down the automatic-RLS helper created by the project wizard, optimize
-- owner policies, and cover foreign keys used by deletes and joins.

revoke execute on function public.rls_auto_enable() from public;

drop policy if exists "own runs are readable" on public.onboarding_runs;
create policy "own runs are readable" on public.onboarding_runs
  for select using (user_id is not null and (select auth.uid()) = user_id);

drop policy if exists "insert own runs" on public.onboarding_runs;
create policy "insert own runs" on public.onboarding_runs
  for insert with check (user_id is not null and (select auth.uid()) = user_id);

drop policy if exists "own unlocks are readable" on public.unlocked_results;
create policy "own unlocks are readable" on public.unlocked_results
  for select using (user_id is not null and (select auth.uid()) = user_id);

drop policy if exists "own profile readable" on public.profiles;
create policy "own profile readable" on public.profiles
  for select using ((select auth.uid()) = id);

drop policy if exists "own profile upsert" on public.profiles;
create policy "own profile upsert" on public.profiles
  for insert with check ((select auth.uid()) = id);

drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles
  for update using ((select auth.uid()) = id);

drop policy if exists "creators read their own profile" on public.creators;
create policy "creators read their own profile" on public.creators
  for select using ((select auth.uid()) = user_id);

drop policy if exists "creators update their own profile" on public.creators;
create policy "creators update their own profile" on public.creators
  for update using ((select auth.uid()) = user_id);

drop policy if exists "creators self-signup" on public.creators;
create policy "creators self-signup" on public.creators
  for insert with check ((select auth.uid()) = user_id);

drop policy if exists "creators see their own clicks" on public.creator_clicks;
create policy "creators see their own clicks" on public.creator_clicks
  for select using (
    creator_id in (select id from public.creators where user_id = (select auth.uid()))
  );

drop policy if exists "creators see their own conversions" on public.creator_conversions;
create policy "creators see their own conversions" on public.creator_conversions
  for select using (
    creator_id in (select id from public.creators where user_id = (select auth.uid()))
  );

drop policy if exists "creators see their own payouts" on public.creator_payouts;
create policy "creators see their own payouts" on public.creator_payouts
  for select using (
    creator_id in (select id from public.creators where user_id = (select auth.uid()))
  );

create index if not exists email_captures_creator_idx
  on public.email_captures (creator_id);
create index if not exists email_captures_run_idx
  on public.email_captures (run_id);
create index if not exists onboarding_runs_user_idx
  on public.onboarding_runs (user_id);
create index if not exists unlocked_results_user_idx
  on public.unlocked_results (user_id);

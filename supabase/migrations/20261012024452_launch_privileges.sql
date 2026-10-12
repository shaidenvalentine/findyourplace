-- All result/creator writes run through trusted server routes. Browser roles must
-- not set paid rankings, creator approval, or commission percentages directly.
revoke insert, update, delete on public.onboarding_runs, public.creators
from anon, authenticated;

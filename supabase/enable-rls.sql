-- Kjør i Supabase → SQL Editor (Production).
-- Løser «RLS Disabled in Public» og e-postvarsler om åpent tilgjengelige tabeller.
--
-- Viktig: Sett SUPABASE_SERVICE_ROLE_KEY i Vercel for API-ruter (moetebooking,
-- ai-beredskap, frontpage-content). Service role omgår RLS og trenger ingen policies.
-- Uten service role vil INSERT fra API med anon-nøkkel feile etter denne migrasjonen.

BEGIN;

-- ── Aktiver RLS ─────────────────────────────────────────────────────────────

ALTER TABLE IF EXISTS public.frontpage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.prosjekter ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.kontaktskjema ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.innlegg ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.ansatt ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.sysadmin ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.moetebookinger ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.ai_beredskap ENABLE ROW LEVEL SECURITY;

-- ── prosjekter: offentlig liste + admin ───────────────────────────────────

DROP POLICY IF EXISTS "prosjekter_select_public_visible" ON public.prosjekter;
CREATE POLICY "prosjekter_select_public_visible"
  ON public.prosjekter
  FOR SELECT
  TO anon, authenticated
  USING (coalesce(vis_paa_nettside, false) = true);

DROP POLICY IF EXISTS "prosjekter_all_authenticated" ON public.prosjekter;
CREATE POLICY "prosjekter_all_authenticated"
  ON public.prosjekter
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ── Admin-tabeller (innlogget bruker = som i /admin) ───────────────────────

DROP POLICY IF EXISTS "ai_beredskap_all_authenticated" ON public.ai_beredskap;
CREATE POLICY "ai_beredskap_all_authenticated"
  ON public.ai_beredskap
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "moetebookinger_all_authenticated" ON public.moetebookinger;
CREATE POLICY "moetebookinger_all_authenticated"
  ON public.moetebookinger
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "frontpage_content_all_authenticated" ON public.frontpage_content;
CREATE POLICY "frontpage_content_all_authenticated"
  ON public.frontpage_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "innlegg_all_authenticated" ON public.innlegg;
CREATE POLICY "innlegg_all_authenticated"
  ON public.innlegg
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "kontaktskjema_all_authenticated" ON public.kontaktskjema;
CREATE POLICY "kontaktskjema_all_authenticated"
  ON public.kontaktskjema
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "ansatt_all_authenticated" ON public.ansatt;
CREATE POLICY "ansatt_all_authenticated"
  ON public.ansatt
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "sysadmin_all_authenticated" ON public.sysadmin;
CREATE POLICY "sysadmin_all_authenticated"
  ON public.sysadmin
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

COMMIT;

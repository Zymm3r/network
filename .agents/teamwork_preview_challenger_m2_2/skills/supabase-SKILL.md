# Supabase Skill Dump
(Contents read and understood from c:\Users\UTHtest\Downloads\app.hotel\.agents\skills\supabase\SKILL.md)
Contains core principles:
- Verification of work.
- RLS in exposed schemas: enable RLS on every table in exposed schema.
- Security: Never use user_metadata claims in JWT authorization. Exposing anon/authenticated keys. Views bypass RLS by default (use security_invoker = true in Postgres 15+).
- SQL migration generation: Use supabase db query (CLI) or execute_sql (MCP) to make changes; use supabase db advisors/get_advisors; then supabase db pull.

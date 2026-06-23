# Supabase Skill
Refer to c:\Users\UTHtest\Downloads\app.hotel\.agents\skills\supabase\SKILL.md for the full contents.
Summary of standard:
- Enable RLS, verify against changelogs, grant table access to authenticated/anon roles if needed.
- Never use user_metadata claims in JWT authorization.
- Always use CLI for migrations: `supabase migration new <name>`.
- Use execute_sql or supabase db query to modify schema directly and pull changes when complete.

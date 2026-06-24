# Safe Mode Execution Plan: Analytics Dashboard Fix

## Current State Assessment
- The "Data Sync Pending" alert on the dashboard is functioning exactly as designed when the backend analytics RPCs are missing.
- The `Dashboard.tsx` gracefully handles the `PGRST202` (function does not exist) error by reverting to the pending state. **No code changes are required in the frontend.**
- The required Supabase RPCs (`get_admin_metrics`, `get_student_metrics`, `get_hardest_exercises`) are defined in `supabase/migrations/20260607000001_analytics_views.sql`.
- The active Supabase environment is a remote project (`netvfzmdewatfnmejcrz` as per `.env.local`).

## Execution Plan (Pending Approval)
1. **Apply Migration**: 
   - Execute the `20260607000001_analytics_views.sql` migration against the remote database using the local Supabase MCP server (`apply_migration` tool) or Supabase CLI (`npx supabase db push`).
2. **Verification**: 
   - Use the MCP `execute_sql` tool to run `SELECT proname FROM pg_proc WHERE proname IN ('get_admin_metrics', 'get_student_metrics');` to verify the functions were successfully created.
   - Run the frontend application and confirm the Dashboard UI displays the metric cards instead of the pending alert.

**Awaiting explicit user approval before executing these steps.**

# Database Stabilization Rollout

The stabilization migration must not be pushed directly to production until the
legacy migration history has been reconciled on an isolated Supabase branch.

## Required GitHub Environment Secrets

- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_PROJECT_ID`

Configure these on the protected `production` GitHub environment and require a
reviewer before deployments can start.

## Backup

Run the following with the non-pooling production connection string before any
migration-history repair:

```sh
supabase db dump --db-url "$DATABASE_URL" -f backup/roles.sql --role-only
supabase db dump --db-url "$DATABASE_URL" -f backup/schema.sql
supabase db dump --db-url "$DATABASE_URL" -f backup/data.sql --use-copy --data-only
```

Store backups outside the repository and verify that each file is non-empty.

## Baseline Status

Completed locally on 2026-07-29:

1. Backups were written outside the repository under
   `Documents/network-backups/20260729-stabilization`.
2. The active chain now has empty placeholders matching all 10 remote versions.
3. `20260729010000_production_baseline.sql` was generated from the production
   public schema; destructive historical migrations were moved to
   `supabase/migrations_legacy`.
4. `supabase/seed.sql` contains only 30 public courses and 73 lessons.
5. `supabase db reset`, database lint, and all 17 pgTAP tests pass locally.

## Production Rollout

1. Review the backup files and keep them outside Git.
2. Deploy the baseline and hardening migration to an isolated preview branch,
   then run database tests and advisors there.
3. Mark only the baseline version as applied on production without executing it:

   ```sh
   supabase migration repair --linked --status applied 20260729010000
   ```

4. Confirm `supabase migration list --linked` shows the baseline on both sides.
5. Publish the hardening migration through the protected GitHub `production`
   environment. The workflow refuses to push until the baseline is recorded.

Do not run the historical chain against production. It contains destructive
cleanup migrations intended for empty or temporary databases.

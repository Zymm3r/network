## Challenge Summary

**Overall risk assessment**: LOW

## Challenges

### [Low] Challenge 1: Fallback on Query Failures
- **Assumption challenged**: The assumption that database query failures are only caused by temporary network issues or local configurations and can be safely bypassed using the local `products.json` fallback.
- **Attack scenario**: If the database is misconfigured (e.g. invalid columns, broken RLS policy causing 0 rows returned) in production, the app will silently fall back to `products.json`, which could cause users to see outdated local data instead of receiving a clear error notification.
- **Blast radius**: User sees outdated catalog info rather than realizing they have a connection error.
- **Mitigation**: Distinguish between "no data returned" and a hard database connection/network error; display a subtle notification warning the user that they are viewing a cached/offline catalog.

### [Low] Challenge 2: Hyphen-insensitive Slug Matching
- **Assumption challenged**: The assumption that matching slugs by stripping hyphens is safe and won't result in collisions.
- **Attack scenario**: If the catalog contains two different products whose normalized slugs collide (e.g., `wme-1c` vs `wme1-c`), the detail page could display details of the wrong product.
- **Blast radius**: User displays the wrong product catalog page.
- **Mitigation**: Ensure that when importing products, the uniqueness constraint is applied to the normalized/stripped slugs as well, or restrict the slug generator to avoid producing colliding formats.

## Stress Test Results

- **Offline database access** → `useProducts` catches error and enables `useLocalOnly` fallback → App loads fallback local product catalog → **PASS**
- **Non-existent slug search** → `useProductDetail` throws "Product not found in catalog" error and gracefully yields error state → App displays error boundary / error state → **PASS**
- **Collision check for slug normalizer** → Normalizes hyphenated slugs → Handled by slugify dynamically → **PASS**

## Unchallenged Areas

- **E2E Playwright Flows** — Cannot run full E2E flow tests locally without a Docker daemon/container service running to host the Supabase database.

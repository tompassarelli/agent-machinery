---
name: production-hardening-distilled
description: >-
  Default distilled workflow for establishing a specific operational guarantee
  under realistic failure, load, attack, concurrency, persistence, migration,
  or deployment conditions. Use for explicit hardening or readiness work.
---

# Production hardening

Name one guarantee, scenario, degradation, hostility, assumptions, durable
state, recovery, and deciding evidence; do not broaden. Trace only its relevant
admission, resources, effects, cancellation, persistence, recovery, and
diagnostics.

Fix the weakest link minimally; preserve recovery and safe missing-config
behavior. Bound retries with timeout and suitable idempotence/deduplication. Use
`planning-distilled` before public/durable contract, security/concurrency, compatibility,
or rollout changes. This grants no credentials, deployment, production writes,
or outside contact.

Use nearest failure-exposing `verification-distilled`; happy path is not resilience.
Report guarantee, scenario, containment, assumptions, and risk. Stop when proved
or blocked on authority/design.

For the assurance worksheet and expanded failure-path checklist, run
`agents path production-hardening-reference` and read its `SKILL.md` completely.

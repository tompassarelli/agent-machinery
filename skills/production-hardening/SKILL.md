---
name: production-hardening
description: >-
  Establish a specific operational guarantee under realistic failure, load,
  attack, concurrency, persistence, migration, or deployment conditions. Use
  for an explicit hardening or readiness request, not routine feature testing.
---

# Production hardening

Hardening is complete when a named guarantee has credible evidence and a known
failure boundary. It is not a generic tour of everything that might go wrong.

## Define the guarantee

Write a compact assurance envelope:

```text
System and scenario:
Guarantee sought:
Allowed degradation:
Inputs or actors considered hostile:
Load and timing assumptions:
State that must survive:
Recovery or rollback requirement:
Evidence that will decide the claim:
```

Distinguish existing guarantees from desired ones. If a premise cannot be
observed, label it as an assumption and keep the resulting uncertainty in the
conclusion.

## Trace the relevant failure path

Follow the chosen scenario through admission, validation, resource ownership,
state change, external calls, cancellation, cleanup, persistence, recovery,
and diagnostics as applicable. Check only dimensions that bear on the named
guarantee, including:

- trust and authorization boundaries;
- limits, queues, backpressure, timeouts, and retry amplification;
- races, ordering, duplicate delivery, partial completion, and cancellation;
- atomicity, corruption, restore, migration, and version skew;
- capacity and latency under a representative workload; and
- whether an operator can detect the condition and take the documented action.

## Improve the weakest link

Make the smallest change that closes the demonstrated gap. Preserve a recovery
path and safe behavior when configuration or enforcement is missing. A retry
must have bounded attempts, a timeout policy, and idempotence or deduplication
appropriate to the side effect.

Use `planning` before altering a public contract, persisted representation,
security boundary, concurrency model, compatibility promise, or rollout
strategy. This skill does not grant deployment access, credentials, production
mutation, or permission to contact outside parties.

## Prove and report

Use `verification` to exercise the nearest deterministic layer that can expose
the failure. Add adversarial, recovery, ordering, migration, or representative
load evidence only when it bears on the contract above. A passing happy path is
not resilience evidence.

Report the guarantee, the exact scenario observed, the rollback or containment
path, assumptions, and residual risk. Put durable guarantees in the system's
existing contract or test surface; do not create a separate attestation system
for a one-off review.

Stop after the requested guarantee is supported or when the remaining gap
requires new authority or a wider design decision.

---
name: program-stewardship
description: >-
  Set the engineering-quality posture for a particular workstream, record a
  consequential deferral, or route an explicit craftsmanship or hardening
  pass. Use when quality investment itself needs a deliberate decision.
---

# Program stewardship

Quality choices belong to a defined scope and lifetime. A prototype, a product
feature, and a load-bearing subsystem can coexist without sharing one universal
craft budget.

## Choose the posture

Record only facts that affect the decision:

```text
Scope and purpose:
Expected lifetime:
Cost of failure or change:
Interfaces or state that are already durable:
Minimum evidence:
Cleanup budget:
Debt accepted for now:
Debt forbidden here:
```

A disposable experiment should have a clear disposal or promotion boundary. A
normal delivery should leave touched code understandable and tested at the
relevant seam. A deliberately intensive pass is justified where future change,
operational risk, or semantic importance pays for it.

## Maintain the floor

Regardless of posture:

- keep the relevant build and behavior evidence intact;
- preserve security, durability, compatibility, and data promises unless the
  task explicitly changes them;
- keep ownership of durable facts and effects unambiguous;
- avoid making public vocabulary or error behavior less coherent; and
- do not add a framework solely to make temporary work look polished.

Small local improvements may ride with feature work when their correctness and
value are obvious. Broader restructuring gets its own scope. Private
duplication or provisional structure can be acceptable when it is reversible
and cheaper than guessing the future abstraction.

Record a deferral only if it can become consequential. Include the reason and
an observable reopening event—for example a second implementation, repeated
coordinated edits, promotion to a persisted or public boundary, an incident, or
measured maintenance cost. Use the project's existing tracking mechanism.

## Route a dedicated pass

Use `program-craftsmanship` for behavior-preserving work on names, authority,
types, modules, private APIs, errors, tests, or local structure. Use
`production-hardening` for an operational guarantee involving failure,
concurrency, hostile input, load, persistence, migration, upgrade, or recovery.
Use `planning` and `verification` when those procedures apply.

Do not schedule recurring reviews, create quality sidecars, or invent a global
stewardship ledger merely because this skill was invoked. Such machinery needs
its own explicit objective and authority.

Stop when the chosen floor is met and further work is speculative, outside the
scope, or not worth its opportunity cost.

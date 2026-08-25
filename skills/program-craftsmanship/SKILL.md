---
name: program-craftsmanship
description: >-
  Improve a bounded area of established code while preserving its observable
  behavior. Use for an explicit cleanup or refactoring pass where semantics,
  ownership, naming, structure, errors, tests, or maintainability need care.
---

# Program craftsmanship

This is maintenance with a behavioral constraint. It should make the next
correct change easier without quietly redesigning the product.

## Set the boundary

Name the code and behavior under review, its callers, authoritative state,
generated or vendored boundaries, and the public or persisted surfaces that
must not move. Read governing repository instructions and enough nearby history
to understand the actual source of friction.

Choose an existing check with `verification` before editing. If behavior cannot
be compared credibly, restrict the pass to mechanical changes or stop.

## Find high-value friction

Look for concrete problems such as:

- different names for one domain concept, or one name carrying several;
- unclear ownership of state, effects, or lifecycle transitions;
- abstraction layers that hide rather than simplify the behavior;
- modules coupled by implicit ordering or duplicated decisions;
- private APIs that permit invalid states or discard useful errors;
- tests that obscure the contract they are meant to protect; and
- comments or file layout that contradict the executable structure.

Prioritize issues encountered by current work, repeated changes, defects, or
meaningful blast radius. Do not polish inactive code merely because it could be
different.

## Refactor within the contract

Mechanical renames, dead-code removal, formatting, and compiler-supported
simplification are appropriate when their equivalence is clear. Local
extraction, inlining, type refinement, error cleanup, and module reshaping need
behavioral coverage and an evident reduction in complexity.

Keep unrelated fixes separate. Do not introduce speculative generality or move
public APIs, stored data, security boundaries, concurrency behavior,
compatibility promises, or deployment semantics under the label of cleanup.
Use `planning` or `production-hardening` if one of those surfaces must change.

Edit authoritative source and regenerate owned output through its documented
mechanism. Never modify vendored or generated projections directly.

## Verify the result

Apply changes in coherent groups, run the selected repository-native evidence,
and inspect the final diff for semantic drift and accidental scope expansion.
Remove changes whose benefit is marginal or whose equivalence cannot be shown.

Record remaining debt only in an existing project mechanism and only when a
specific future event should reopen it. Otherwise the change and handoff are
the record.

Stop when the bounded problems are resolved, evidence becomes insufficient, or
the next improvement is a matter of taste.

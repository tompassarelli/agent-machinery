---
name: prior-art
description: >-
  Investigate existing solutions before committing to a consequential new
  protocol, representation, dependency, interface, or custom infrastructure.
  The result must inform a named decision rather than merely collect sources.
---

# Prior-art research

Research begins with a choice that needs evidence.

```text
Decision to make:
Required properties:
Known constraints:
Claim that needs checking:
What would be enough to decide:
```

If there is no decision or uncertainty in that frame, explicit prior-art work
is unnecessary.

## Read the system first

Locate the current implementation, its callers, design notes, dependencies,
tests, and relevant change history. Identify which limitations are observed and
which are only assumed. Existing local conventions are candidates, not proof
that the same choice remains right.

## Find credible alternatives

Search authoritative external material available within the task's access
boundary. Prefer specifications, maintained project documentation, source at a
named revision, first-party engineering accounts, and reproducible measurements.
Recency matters for active ecosystems; operational history matters for mature
infrastructure.

For each serious candidate, capture:

```text
Candidate:
How it satisfies the requirement:
Integration and operating cost:
Important failure or limitation:
Exit path:
Evidence source:
```

Include the conventional solution and at least one meaningfully different
alternative when one exists. Avoid padding the set with options that cannot
meet the stated constraints.

Use `greenfield` when selecting a new dependency. Before copying, adapting, or
vendoring external code or prose, use `external-code` and establish permission,
license duties, and attribution at the exact source revision.

## Test the departure

When the preferred design differs from established practice, state the exact
requirement that forces the difference. Choose a small experiment or analysis
that could show the departure is unnecessary or unsound. Use `verification` to
make that check proportionate to the decision.

## Report the decision evidence

Return:

```text
Decision:
Local evidence:
Conventional approach:
Alternatives considered:
Reason for the selected approach:
Reusable components:
Remaining uncertainty:
Disproving check:
Sources and licenses:
```

Stop when the named decision can be made honestly. Additional related reading
is not useful unless it can change that decision or reduce a material risk.

---
name: build-vs-reuse
description: >-
  Decide whether a consequential capability should be adopted, configured,
  extended, forked, or implemented locally. Use when the ownership boundary is
  part of the product or architecture decision.
---

# Build or reuse

The decision is about long-term responsibility, not just initial code volume.

## Describe the capability

Separate the behavior that makes the product distinctive from supporting work
that simply has to function. Record the required semantics, performance and
security constraints, portability needs, integration environment, acceptable
dependencies, and replacement horizon.

Policy and explicit user direction remain authoritative. Use `prior-art` when
the available approaches have not yet been established.

## Compare real ownership costs

Evaluate viable choices across the same questions:

```text
Option:
Product behavior it controls:
Code and operations we would own:
Integration cost:
Upgrade and migration cost:
License and distribution duties:
Lock-in or replacement cost:
Evidence for fit:
```

Consider direct adoption, configuration, composition, a narrow extension, a
maintained fork, and a focused local implementation where each is credible.
Reject a candidate for a concrete unmet requirement, not because it was made
elsewhere or feels unfashionable.

Reuse is usually attractive for established supporting capabilities. Local
implementation becomes more credible when exact semantics are the product,
when an external abstraction owns too much of the system, or when its security,
determinism, portability, performance, or exit characteristics fail a required
constraint.

Before incorporating external code or prose, use `external-code` to confirm
permission and preserve the required notices.

## Bound custom work

If local work wins, define its smallest useful interface, the external pieces
it can still reuse, and how it could later be replaced. State a check that can
falsify the reason for building it.

Return a short decision:

```text
Selected ownership model:
Distinctive behavior kept in-house:
Reused supporting pieces:
Why the alternatives fail required constraints:
Ongoing obligations:
Replacement seam:
Validation:
```

Do not equate reuse with taking the largest framework or building with avoiding
all dependencies. Choose the boundary that leaves the least unnecessary
responsibility while preserving the behavior the product must control.

---
name: planning
description: >-
  Prepare an engineering plan when work affects architecture, durable data,
  public interfaces, important dependencies, or another costly-to-reverse
  boundary. Skip this skill for a small change whose method and checks are
  already clear.
---

# Engineering planning

A useful plan fixes the decisions that should not be rediscovered during
implementation while leaving routine coding choices to the implementer.

## Establish the planning boundary

Read the governing instructions and the smallest relevant slice of the system.
Then record:

```text
Outcome:
In scope:
Out of scope:
Existing behavior that must survive:
Decisions this plan will settle:
Decisions the implementer may make locally:
Evidence required at completion:
```

Name actual consumers, stored formats, APIs, security properties, and operating
constraints when they exist. Do not invent compatibility or migration duties
for hypothetical consumers.

Use `prior-art` if the proposal introduces a durable protocol, representation,
dependency, or original mechanism. Use `verification` to choose evidence that
can distinguish success from a plausible failure.

## Select the depth

For a bounded change, provide an ordered task plan:

```text
Goal:
Constraints:
Implementation steps:
Checks:
```

For a larger milestone, also make the design commitments explicit:

```text
Capability gained:
Key decisions and reasons:
Alternatives rejected:
Migration or rollout:
Failure containment and recovery:
First result that could disprove the approach:
Completion evidence:
```

Every step should leave the system in an intelligible state and identify the
input it needs from earlier steps. Parallel work is appropriate only where the
outputs can be reviewed independently and the integration boundary is stated.

## Make implementation decidable

The plan must say:

- which source owns each durable fact or generated artifact;
- which callers, persisted values, or public surfaces move together;
- where a breaking change requires an in-tree migration;
- what can be replaced freely;
- what failure stops the approach or sends it back for redesign; and
- what concrete observation closes the work.

Prefer an early vertical proof over a long sequence that postpones the central
risk. Keep ordinary details out of the plan when repository conventions already
answer them.

## Return the plan

Produce the plan in the current response. Ask for a decision only when two
reasonable choices would lead to materially different products or authority.
Otherwise choose the best supported reversible option and identify the
assumption.

Stop when another planning paragraph would not change a decision, an
implementation boundary, or the completion evidence.

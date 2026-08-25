---
name: compose
description: >-
  Assemble a provider-independent bespoke composition across role, task grade,
  domain requirements, topology, posture, semantic tier, reasoning,
  capabilities, done criteria, and report shape. Use when no stock template's
  responsibility or authority boundary fits.
---

# Compose a bespoke composition

Read `agent-machinery:doctrine.md`, `agent-machinery:docs/routing.md`, and
`agent-machinery:staffing/catalog.json` before composing.

## Selection ladder

1. Use a stock template unchanged when responsibility, deliverable, topology,
   capabilities, done criteria, and report shape fit.
2. Use a template override only when one or more of task grade, domains, tier,
   reasoning, or posture changes. Record the exact changed fields and one
   reason.
3. Use a bespoke composition when topology, responsibility, deliverable,
   capabilities, decision authority, escalation boundary, done criteria, or
   report shape differs.

## Build the contract

Choose each axis independently:

- a stable lowercase kebab-case role ID;
- task grade;
- domain requirements and the context that will satisfy them;
- worker or orchestrator topology from dependency shape;
- semantic tier and reasoning at or above the minimum-sufficient floor;
- posture;
- canonical capabilities;
- responsibility and deliverable;
- decisions the run may make and conditions it must escalate;
- observable done criteria; and
- one compact report shape.

Every required side effect must fit the declared capabilities. Metadata does
not grant access. The consuming runtime must prove an enforceable mapping before
admission.

Emit exactly the eight-field request defined by
`agent-machinery:contracts/routing-request.schema.json`. Provider, model,
account, dispatch syntax, telemetry, and live coordination are execution facts
outside the request.

Use `node scripts/compose-routing.mjs` to construct and validate the machine
payload. A nearest template may seed defaults but never contributes authority
implicitly.

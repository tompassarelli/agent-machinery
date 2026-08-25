---
name: staffing
description: >-
  Select a provider-independent stock role or bespoke composition for delegated
  work. Use whenever a task must be classified by role, grade, domain,
  topology, semantic tier, reasoning, posture, and capabilities before a
  concrete run is admitted.
---

# Staffing

Read `agent-machinery:doctrine.md`, `agent-machinery:staffing/catalog.json`,
and `agent-machinery:docs/routing.md`. They are the authority for role
selection, topology, capability labels, and the eight-field request.

Use a stock template when its responsibility, deliverable, topology,
capabilities, done criteria, and report shape fit. Override only task grade,
domain requirements, tier, reasoning, or posture, and record the exact changed
fields plus one reason. Use a bespoke composition for every other contract.

The generated templates in `agent-machinery:agents/` are neutral behavior
contracts. A consumer must map their canonical capabilities to enforceable
runtime access and resolve semantic tier/reasoning without lowering the
requested floor. Missing enforcement fails closed.

Return the chosen role or bespoke ID, all eight request fields, canonical
capabilities, and the reason for every override or bespoke boundary.

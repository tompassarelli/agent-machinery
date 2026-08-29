---
name: agent-run-design-distilled
description: >-
  Design a provider-independent agent run from a role, portable execution
  requirements, and a stock or bespoke composition. Use before a concrete run
  is admitted, including when no stock template fits.
---

# Agent run design

Read `agent-machinery:doctrine.md`, `agent-machinery:staffing/catalog.json`,
and `agent-machinery:docs/routing.md`. Resolve `project-exposure-v1`, classify
the role and every other route axis independently, then use a stock template
only when its complete behavior and authority contract fits. Otherwise create
a bespoke composition. Never lower a capability floor or admit authority the
consumer cannot enforce.

Emit exactly `role`, `taskGrade`, `domainRequirements`, `topology`, `tier`,
`reasoning`, `posture`, and `composition`. A template ID is provenance metadata
inside `composition` and need not equal `role`; it grants neither ownership nor
runtime access. A worker remains terminal even when its brief reveals useful
decomposition and must escalate that signal to its immediate parent.

Return the eight fields, canonical capabilities, supplied domain context, and
reasons for overrides or bespoke boundaries. Run lifecycle, wake, wait, rearm,
Stop, transport, concrete provider/model/account selection, and runtime access
mapping remain consumer responsibilities outside Agent Machinery.

For the comparison worksheet and CLI handoff, run
`agents path agent-run-design-reference` and read its `SKILL.md` completely.

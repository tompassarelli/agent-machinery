# Routing contract

Routing follows a resolved `project-exposure-v1` sidecar. That sidecar binds the
scoped engineering context and lifecycle budget without adding a routing field.
An omitted sidecar resolves to volatile owner-controlled research with exact
bounded-claim correctness and an empty lifecycle budget; omission never becomes
a form requirement or evidence of higher stakes. Consumers use
`resolveProjectExposureProfile` and
`validateRoutingAdmission` at the execution boundary; raw routing validation
alone does not admit work.

The provider-independent routing request has exactly eight fields:

| Field | Meaning |
| --- | --- |
| `role` | Stable lowercase kebab-case responsibility ID, independent of template identity |
| `taskGrade` | Work scope and autonomy prior |
| `domainRequirements` | Context or expertise the brief must supply |
| `topology` | `worker` or `orchestrator` authority |
| `tier` | Semantic capability floor |
| `reasoning` | Deliberation level |
| `posture` | Value-collision ordering |
| `composition` | Stock template or complete bespoke contract, including composition provenance |

Tier and reasoning are orthogonal. `tier` is the provider-independent
capability floor and `reasoning` is the deliberation budget; no value on one
axis supplies a default or normalization for the other. Every vocabulary pair
that satisfies the applicable minimum floor is valid, including
`economy` + `high`, `economy` + `xhigh`, and `economy` + `max`. Consumers must
preserve an explicit pair rather than replacing it with a stock-template
default. A selection assessment may impose a minimum reasoning floor as an
explicit safety rule, but that floor does not couple or rewrite the selected
axis.

Stock templates have fixed topology and capabilities. `composition.id` names
the template and may differ from `role`; that identity is nested provenance
metadata, not ownership, authority, or a ninth field. Overrides may change task
grade, domains, tier, reasoning, or posture and must record the exact changed
fields plus one reason. A bespoke composition supplies responsibility,
deliverable, capabilities, decision and escalation bounds, done criteria, and
report shape.

Capability lists are transitively closed declarations of effective authority:

- `filesystem.search` implies `filesystem.read`;
- `shell.readonly` implies filesystem read and search authority, and is valid
  only when filesystem writes from shell execution are denied; and
- `shell` implies filesystem read, search, and write authority.

`shell` and `shell.readonly` are mutually exclusive. A consumer must enforce
the effective closure, not only the literal labels. If it cannot enforce the
declared filesystem boundary, it must fail closed and not run the agent.

The optional `minimum-sufficient-v1` sidecar derives a minimum tier and
reasoning level from decision ownership, seam scope, error exposure, oracle
strength, foundational impact, dependency shape, and reasoning shape. It is
not a ninth routing field.

Consumers map canonical capabilities to concrete tools and sandboxes. Missing
or unenforceable capability mappings fail closed. Provider, model, account,
dispatch, telemetry, and live coordination remain outside this contract.
Run lifecycle, wake, wait, rearm, Stop, and transport remain outside this
package as well.

Schema identities are stable and versioned independently of package paths:
`urn:agent-machinery:schema:routing-request:v2` and
`urn:agent-machinery:schema:selection-assessment:v1`. Resolve their packaged
files through the contract and asset paths in `catalog.json`.

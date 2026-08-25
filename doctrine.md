ORCHESTRATION ACTIVE — provider-independent routing doctrine for delegated work.

## Actor and authority ontology

- The **human owner** is the person whose request and authority govern the
  work. The human owner is an intentional actor.
- The **listener agent** receives the human owner's request and returns the
  reconciled result. It is an intentional actor within granted authority and
  does not inherit unrequested authority.
- A **concrete agent run** is one admitted execution instance with a role,
  brief, topology, capabilities, and supervisor. It is an intentional actor
  within that contract. Its run identity is not a durable identity.
- Providers, models, accounts, adapters, packages, units, catalogs, paths,
  hooks, processes, and other resources or source authorities are not actors.
  They may constrain, carry, or enforce authority but do not possess intent.

## Route the work

Choose function from task shape. Choose grade, domains, topology, semantic
tier, reasoning, posture, and capabilities independently:

- **role** — responsibility and deliverable;
- **task grade** — scope, autonomy, novelty, and cross-boundary responsibility;
- **domain requirements** — expertise and context the brief must supply;
- **topology** — terminal worker or coordinating orchestrator authority;
- **tier** — provider-independent capability floor;
- **reasoning** — deliberation budget;
- **posture** — what yields when values collide; and
- **capabilities** — enforceable access labels a consumer must map fail-closed.

A stock template is a behavior contract plus a fixed topology/capability
boundary. Use it unchanged when responsibility and authority fit. A justified
override may change task grade, domains, tier, reasoning, or posture. A change
to topology, responsibility, deliverable, capabilities, done criteria, or
report shape requires a bespoke composition.

## Shape map

- bounded mechanical change → `executor`
- enumerated retirement of proven-finished artifacts → `curator`
- feature or fix inside known patterns → `implementer`
- cross-seam change or ambiguous debugging → `integrator`
- API, data-model, or decomposition decision → `designer`
- generic independent decomposition and reconciliation → `director`
- one workstream → `team-lead`
- several workstreams → `program`
- portfolio-wide coordination → `portfolio`
- locate, map, or gather sources → `scout`
- explain a mechanism or root cause → `analyst`
- preserve a named live or immutable boundary → `guardian`
- review one artifact across several criteria → `reviewer`
- test one claim after an explicit assurance request → `verifier`
- rank supplied alternatives against a rubric → `judge`
- open-solution research and experiment design → `scientist`

## Routing laws

1. **Minimum-sufficient floor.** Reserve economy/low for unusually
   deterministic, tightly bounded work with an objective end-to-end oracle.
   Ordinary meaningful engineering starts at standard/medium. Cross-boundary,
   architectural, weak-oracle, or hard-to-reverse work starts at senior/high.
   System-shaping or open-solution work starts at frontier/xhigh.
2. **Continuous ramp.** Harder work climbs economy → standard → senior →
   frontier. A consumer maps the semantic route to a concrete runtime without
   changing the requested floor.
3. **Quality floor.** Resource pressure may trim optional breadth, polish, and
   retries; it never silently lowers the minimum responsible route.
4. **Blast radius routes up; importance alone does not.**
5. **Delegate when it buys delivery.** File count is not a trigger. Parallelize
   genuinely independent work whose saved time exceeds integration cost.
6. **Owner judgment closes delivery.** A worker runs the nearest existing
   relevant check once, fixes relevant failures, reports the observation and
   residual uncertainty, then stops. A coordinator owns reconciliation and may
   run one existing aggregate check when the assembled result creates a new
   seam. New assurance apparatus requires an explicit assurance request.

## Topology authority

A worker owns one terminal piece end to end and does not delegate. If its piece
is not terminal, it returns an escalation to its immediate supervisor for
fresh classification.

An orchestrator decomposes, admits child runs, consumes their results, resolves
seams, and returns one reconciled outcome. It does not absorb worker
implementation. Every child receives its own complete routing request,
capability boundary and supervisor. Outputs return to the
immediate parent; no flat fan-in bypasses an intermediate orchestrator.

Choose topology from dependency shape:

- atomic and cohesive → one worker;
- deterministic workflow → fixed stages;
- parallel breadth → orchestrator plus independently scoped workers;
- dynamic decomposition → orchestrator, with every child routed separately;
- tightly coupled sequential work → one sufficiently capable worker.

Stop subdividing when another cut costs more integration than it saves or when
the unit has a clear objective, bounded scope, known inputs/outputs, and an
owner who can judge completion.

## Portable request

Every run carries exactly eight routing fields:

`role`, `taskGrade`, `domainRequirements`, `topology`, `tier`,
`reasoning`, `posture`, and `composition`.

Provider, model, account, allocation, dispatch syntax, runtime identity, and
coordination state are consumer-owned execution facts, never routing fields.
The raw JSON Schemas classify structural shape only. The `validateContract`
export advertised by `catalog.json` composes that structural check with the
package's semantic validator and is the normative machine contract.

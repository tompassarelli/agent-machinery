# agent-machinery

Provider-independent delegation contracts, run design, role templates, and
reusable engineering procedures.

The package is deliberately a source authority, not a runtime. It does not
choose providers or models, dispatch work, manage accounts, coordinate live
participants, install hooks, or project policy into a harness. A consumer
imports the neutral assets declared in `catalog.json` and combines them with
its own adapters and enforcement.

## Public surface

- `agent-machinery:catalog.json` is the complete export manifest. Its
  `delegation` module groups acknowledged work ownership with
  provider-independent run design; `agent-practice` groups the optional
  engineering workflows.
- `agent-machinery:doctrine.md` defines the portable actor, routing, and topology
  rules.
- `agent-machinery:contracts/` contains the machine contracts. Raw schemas
  classify structure; the catalog-advertised `validateContract` export also
  enforces semantics.
- Detailed routing, composition, and extension guidance lives in
  `agent-machinery:docs/`. Generated provider-neutral templates live in
  `agent-machinery:agents/`.

```sh
bun test
bun run check
```

Consumers should resolve assets through the manifest or the exports from
`agent-machinery:index.mjs`; no path outside this package is an authority.

## License

Licensed under either MIT or Apache-2.0, at your option. See `PROVENANCE.md`
for the public source revisions and retained attribution.

# agent-machinery

Provider-independent doctrine, role contracts, routing types, generated agent
templates, and reusable engineering procedures.

The package is deliberately a source authority, not a runtime. It does not
choose providers or models, dispatch work, manage accounts, coordinate live
participants, install hooks, or project policy into a harness. A consumer
imports the neutral assets declared in `catalog.json` and combines them with
its own adapters and enforcement.

## Package contract

- `catalog.json` is the complete export manifest.
- `doctrine.md` is the portable routing and topology doctrine.
- `staffing/catalog.json` defines canonical role IDs, axes, capabilities, and
  stock compositions.
- `contracts/` holds the stable eight-field routing request and
  minimum-sufficient selection sidecar.
- Raw JSON Schemas check structure only; the catalog-advertised
  `validateContract` export performs required structural and semantic checks.
- `docs/` holds the source blocks used by `scripts/build-agents.mjs`.
- `agents/` is generated provider-neutral template output.
- `staffing/SKILL.md` and `skills/*/SKILL.md` are standard skills.

```sh
npm test
npm run check
```

Consumers should resolve assets through the manifest or the exports from
`index.mjs`; no path outside this package is an authority.

## License

Licensed under either MIT or Apache-2.0, at your option. See `PROVENANCE.md`
for the public source revisions and retained attribution.

import test from "node:test";
import assert from "node:assert/strict";
import {
  assetPath,
  defaultProjectExposureProfile,
  loadExportCatalog,
  loadStaffingCatalog,
  validateRoutingAdmission,
  validateRoutingRequest,
} from "../index.mjs";
import { FORBIDDEN_TEXT, validatePackage } from "../scripts/validate.mjs";

test("forbidden provider brands match as real words", () => {
  const brands = [["Open", "AI"], ["Nor", "th"]].map((parts) => parts.join(""));
  for (const brand of brands) assert.equal(FORBIDDEN_TEXT.test(brand), true, brand);
});

test("export manifest is a closed provider-neutral package", () => {
  const result = validatePackage();
  assert.equal(result.units, 31);
  assert.equal(result.templates, 16);
});

test("public index resolves declared assets and validators", () => {
  const catalog = loadExportCatalog();
  assert.equal(catalog.package.license, "MIT OR Apache-2.0");
  assert.equal(loadStaffingCatalog().presets.length, 16);
  assert.match(assetPath("doctrine.md"), /doctrine\.md$/);
  const executor = {
    role: "executor",
    taskGrade: "novice",
    domainRequirements: [],
    topology: "worker",
    tier: "economy",
    reasoning: "low",
    posture: "deliver",
    composition: { kind: "template", id: "executor", overrides: [] },
  };
  assert.equal(validateRoutingRequest(executor), executor);
  assert.equal(validateRoutingAdmission(undefined, executor), executor);
  const unclassified = defaultProjectExposureProfile();
  assert.equal(unclassified.engineeringContext, "volatile-owner-controlled-research");
  assert.equal(unclassified.facts.correctness, "exact-bounded-claim");
  assert.deepEqual(unclassified.lifecycleBudget, []);
});

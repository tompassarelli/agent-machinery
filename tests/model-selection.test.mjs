import test from "node:test";
import assert from "node:assert/strict";
import { resolveExecutionPlan } from "../scripts/model-selection.mjs";

const inventory = [
  { provider: "openai", model: "gpt-5.6-luna", available: true, efforts: ["low", "medium", "high", "xhigh", "max"] },
  { provider: "openai", model: "gpt-5.6-terra", available: true, efforts: ["low", "medium", "high", "xhigh", "max"] },
  { provider: "openai", model: "gpt-5.6-sol", available: true, efforts: ["low", "medium", "high", "xhigh", "max"] },
];

function request(overrides = {}) {
  return {
    role: "implementer",
    taskGrade: "mid",
    domainRequirements: [],
    topology: "worker",
    capabilityFloor: "standard",
    serviceClass: "balanced",
    reasoning: "medium",
    posture: "deliver",
    composition: {
      kind: "template",
      id: "implementer",
      overrides: Object.keys(overrides).filter((field) =>
        ["taskGrade", "domainRequirements", "capabilityFloor", "serviceClass", "reasoning", "posture"].includes(field)),
      ...(Object.keys(overrides).length ? { overrideReason: "focused resolver fixture" } : {}),
    },
    ...overrides,
  };
}

test("one resolver preserves floor and effort, keeps Terra explicit-only, and reacts to evidence and inventory", () => {
  const baseline = resolveExecutionPlan({
    request: request({ capabilityFloor: "baseline", reasoning: "low" }),
    inventory,
  });
  assert.deepEqual(baseline.selected, {
    provider: "openai",
    model: "gpt-5.6-luna",
    effort: "low",
    reason: "balanced:quality>success>latency>price>tokens>catalogPrior;evidence=prior;policy=model-selection-2026-08-30.1",
  });
  assert(baseline.excluded.some(({ actionId, reason }) =>
    actionId === "openai/gpt-5.6-terra@low" && reason === "explicit-only-model"));

  const advanced = resolveExecutionPlan({
    request: request({ capabilityFloor: "advanced", reasoning: "high" }),
    inventory,
  });
  assert.equal(advanced.selected.model, "gpt-5.6-sol");
  assert.equal(advanced.selected.effort, "high");

  const failedLuna = Array.from({ length: 8 }, () => ({
    provider: "openai", model: "gpt-5.6-luna", effort: "low",
    qualityPassed: false, processSucceeded: true,
    durationMs: 100, priceMicrousd: 10,
  }));
  const calibrated = resolveExecutionPlan({
    request: request({ capabilityFloor: "baseline", reasoning: "low" }),
    inventory,
    evidence: failedLuna,
  });
  assert.equal(calibrated.selected.model, "gpt-5.6-sol");
  assert(calibrated.excluded.some(({ actionId, reason }) =>
    actionId === "openai/gpt-5.6-luna@low" && reason === "quality-floor"));

  const racedInventory = inventory.map((row) =>
    row.model === "gpt-5.6-luna" ? { ...row, available: false } : row);
  const replanned = resolveExecutionPlan({
    request: request({ capabilityFloor: "baseline", reasoning: "low" }),
    inventory: racedInventory,
  });
  assert.equal(replanned.selected.model, "gpt-5.6-sol");
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  validateRoutingRequest,
  validateSelectionAssessment,
} from "../index.mjs";

const fixture = (name) => JSON.parse(readFileSync(new URL(`../contracts/${name}`, import.meta.url), "utf8"));

for (const item of fixture("routing-request.fixtures.json").valid) {
  test(`routing valid: ${item.name}`, () => {
    assert.equal(validateRoutingRequest(item.request), item.request);
  });
}
for (const item of fixture("routing-request.fixtures.json").invalid) {
  test(`routing invalid: ${item.name}`, () => {
    assert.throws(() => validateRoutingRequest(item.request), new RegExp(item.errorContains));
  });
}
for (const item of fixture("selection-assessment.fixtures.json").valid) {
  test(`selection valid: ${item.name}`, () => {
    assert.equal(validateSelectionAssessment(item.assessment), item.assessment);
  });
}
for (const item of fixture("selection-assessment.fixtures.json").invalid) {
  test(`selection invalid: ${item.name}`, () => {
    assert.throws(() => validateSelectionAssessment(item.assessment), new RegExp(item.errorContains));
  });
}

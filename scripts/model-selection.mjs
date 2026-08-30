import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validateRoutingRequest } from "./routing-request.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const MODEL_SELECTION_CATALOG_SCHEMA_ID =
  "urn:agent-machinery:schema:model-selection-catalog:v1";
export const MODEL_SELECTION_PLAN_VERSION = "agent-machinery-execution-plan:v1";
export const MODEL_SELECTION_CATALOG_PATH = resolve(ROOT, "selection/catalog.json");

const CAPABILITY_FLOORS = ["baseline", "standard", "advanced", "frontier"];
const SERVICE_CLASSES = ["economy", "fast", "balanced", "premium"];
const REASONING_LEVELS = ["low", "medium", "high", "xhigh", "max"];
const METRICS = ["quality", "success", "latency", "price", "tokens", "catalogPrior"];

function object(value, label) {
  if (value == null || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label} must be an object`);
  return value;
}

function exactKeys(value, required, label) {
  const actual = Object.keys(object(value, label));
  const unknown = actual.filter((key) => !required.includes(key));
  const missing = required.filter((key) => !Object.hasOwn(value, key));
  if (unknown.length) throw new Error(`${label} has unknown field(s): ${unknown.join(", ")}`);
  if (missing.length) throw new Error(`${label} is missing field(s): ${missing.join(", ")}`);
}

function uniqueStrings(value, allowed, label) {
  if (!Array.isArray(value) || value.length === 0 ||
      value.some((item) => typeof item !== "string" || !allowed.includes(item)) ||
      new Set(value).size !== value.length)
    throw new Error(`${label} must contain unique values from: ${allowed.join(", ")}`);
  return value;
}

function probability(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 1)
    throw new Error(`${label} must be between 0 and 1`);
}

function positiveInteger(value, label) {
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${label} must be a positive integer`);
}

export function validateModelSelectionCatalog(value) {
  const catalog = object(value, "model selection catalog");
  exactKeys(catalog,
    ["$schema", "version", "policyRevision", "qualityPolicy", "serviceObjectives", "providers"],
    "model selection catalog");
  if (catalog.$schema !== MODEL_SELECTION_CATALOG_SCHEMA_ID)
    throw new Error(`model selection catalog.$schema must be ${MODEL_SELECTION_CATALOG_SCHEMA_ID}`);
  if (catalog.version !== 1) throw new Error("model selection catalog.version must be 1");
  if (typeof catalog.policyRevision !== "string" || !catalog.policyRevision.trim())
    throw new Error("model selection catalog.policyRevision must be non-empty");

  const quality = object(catalog.qualityPolicy, "model selection catalog.qualityPolicy");
  exactKeys(quality,
    ["minimumQuality", "minimumSuccess", "minimumObservations", "nicheMinimumObservations"],
    "model selection catalog.qualityPolicy");
  probability(quality.minimumQuality, "minimumQuality");
  probability(quality.minimumSuccess, "minimumSuccess");
  positiveInteger(quality.minimumObservations, "minimumObservations");
  positiveInteger(quality.nicheMinimumObservations, "nicheMinimumObservations");
  if (quality.nicheMinimumObservations < quality.minimumObservations)
    throw new Error("nicheMinimumObservations must not be below minimumObservations");

  const objectives = object(catalog.serviceObjectives, "model selection catalog.serviceObjectives");
  exactKeys(objectives, SERVICE_CLASSES, "model selection catalog.serviceObjectives");
  for (const serviceClass of SERVICE_CLASSES)
    uniqueStrings(objectives[serviceClass], METRICS, `service objective ${serviceClass}`);

  if (!Array.isArray(catalog.providers) || catalog.providers.length === 0)
    throw new Error("model selection catalog.providers must be non-empty");
  const actions = new Set();
  for (const provider of catalog.providers) {
    exactKeys(provider, ["id", "models"], "model selection provider");
    if (typeof provider.id !== "string" || !provider.id.trim())
      throw new Error("model selection provider.id must be non-empty");
    if (!Array.isArray(provider.models) || provider.models.length === 0)
      throw new Error(`${provider.id}.models must be non-empty`);
    for (const model of provider.models) {
      exactKeys(model,
        ["id", "capabilityFloors", "efforts", "automaticEligible", "niche", "catalogPrior"],
        `model ${provider.id}/${model?.id ?? "<unknown>"}`);
      if (typeof model.id !== "string" || !model.id.trim())
        throw new Error(`${provider.id} model.id must be non-empty`);
      const action = `${provider.id}/${model.id}`;
      if (actions.has(action)) throw new Error(`duplicate model selection action ${action}`);
      actions.add(action);
      uniqueStrings(model.capabilityFloors, CAPABILITY_FLOORS, `${action}.capabilityFloors`);
      uniqueStrings(model.efforts, REASONING_LEVELS, `${action}.efforts`);
      if (typeof model.automaticEligible !== "boolean" || typeof model.niche !== "boolean")
        throw new Error(`${action} automaticEligible and niche must be boolean`);
      const prior = object(model.catalogPrior, `${action}.catalogPrior`);
      exactKeys(prior, SERVICE_CLASSES, `${action}.catalogPrior`);
      for (const serviceClass of SERVICE_CLASSES)
        if (!Number.isSafeInteger(prior[serviceClass]) || prior[serviceClass] < 0)
          throw new Error(`${action}.catalogPrior.${serviceClass} must be a nonnegative integer`);
    }
  }
  return catalog;
}

export function loadModelSelectionCatalog(path = MODEL_SELECTION_CATALOG_PATH) {
  return validateModelSelectionCatalog(JSON.parse(readFileSync(path, "utf8")));
}

function safeNonnegative(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : undefined;
}

function mean(values) {
  const known = values.flatMap((value) => {
    const safe = safeNonnegative(value);
    return safe === undefined ? [] : [safe];
  });
  return known.length === 0 ? undefined : known.reduce((sum, value) => sum + value, 0) / known.length;
}

function rate(observations, field) {
  const known = observations.flatMap((observation) =>
    typeof observation[field] === "boolean" ? [observation[field]] : []);
  if (known.length === 0) return { known: 0 };
  const estimate = known.filter(Boolean).length / known.length;
  const z = 1.96;
  const z2 = z * z;
  const denominator = 1 + z2 / known.length;
  const center = (estimate + z2 / (2 * known.length)) / denominator;
  const radius = z * Math.sqrt(
    estimate * (1 - estimate) / known.length + z2 / (4 * known.length * known.length),
  ) / denominator;
  return { known: known.length, estimate, lower: Math.max(0, center - radius) };
}

function evidenceFor(evidence, provider, model, effort) {
  return evidence.filter((observation) => observation.provider === provider &&
    observation.model === model && observation.effort === effort);
}

function candidateEstimate(provider, model, effort, serviceClass, evidence, policy) {
  const observations = evidenceFor(evidence, provider.id, model.id, effort);
  const quality = rate(observations, "qualityPassed");
  const success = rate(observations, "processSucceeded");
  const required = model.niche ? policy.nicheMinimumObservations : policy.minimumObservations;
  const belowFloor = (quality.estimate !== undefined && quality.known >= required &&
      quality.estimate < policy.minimumQuality) ||
    (success.estimate !== undefined && success.known >= required &&
      success.estimate < policy.minimumSuccess);
  const evidenceStatus = belowFloor ? "quality-floor" :
    observations.length < required || quality.known < required || success.known < required ?
      (model.niche ? "niche-prior" : "prior") :
      quality.lower < policy.minimumQuality || success.lower < policy.minimumSuccess ?
        "insufficient-evidence" : "eligible";
  const tokenMeans = ["inputTokens", "outputTokens", "reasoningTokens", "cacheReadTokens", "cacheWriteTokens"]
    .map((field) => mean(observations.map((observation) => observation[field])))
    .filter((value) => value !== undefined);
  return {
    provider: provider.id,
    model: model.id,
    effort,
    actionId: `${provider.id}/${model.id}@${effort}`,
    evidenceStatus,
    observationCount: observations.length,
    metrics: {
      quality: quality.lower,
      success: success.lower,
      latency: mean(observations.map((observation) => observation.durationMs)),
      price: mean(observations.map((observation) => observation.priceMicrousd)),
      tokens: tokenMeans.length ? tokenMeans.reduce((sum, value) => sum + value, 0) : undefined,
      catalogPrior: model.catalogPrior[serviceClass],
    },
  };
}

function direction(metric) {
  return metric === "quality" || metric === "success" ? "max" : "min";
}

function compareMetric(left, right, metric) {
  const a = left.metrics[metric];
  const b = right.metrics[metric];
  if (a === undefined && b === undefined) return 0;
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  return direction(metric) === "max" ? b - a : a - b;
}

function inventoryRows(value) {
  if (!Array.isArray(value)) throw new Error("model selection inventory must be an array");
  return value.map((row, index) => {
    const item = object(row, `model selection inventory[${index}]`);
    for (const field of ["provider", "model"])
      if (typeof item[field] !== "string" || !item[field].trim())
        throw new Error(`model selection inventory[${index}].${field} must be non-empty`);
    if (typeof item.available !== "boolean")
      throw new Error(`model selection inventory[${index}].available must be boolean`);
    uniqueStrings(item.efforts, REASONING_LEVELS, `model selection inventory[${index}].efforts`);
    return item;
  });
}

export function resolveExecutionPlan({ request, inventory, evidence = [], constraints = {}, catalog: catalogValue }) {
  const catalog = validateModelSelectionCatalog(catalogValue ?? loadModelSelectionCatalog());
  validateRoutingRequest(request);
  const rows = inventoryRows(inventory);
  if (!Array.isArray(evidence)) throw new Error("model selection evidence must be an array");
  object(constraints, "model selection constraints");
  const serviceClass = request.serviceClass;
  const objective = catalog.serviceObjectives[serviceClass];
  const excluded = [];
  const candidates = [];
  for (const provider of catalog.providers) for (const model of provider.models) {
    const actionId = `${provider.id}/${model.id}@${request.reasoning}`;
    const inventory = rows.find((row) => row.provider === provider.id && row.model === model.id);
    const explicit = constraints.provider === provider.id && constraints.model === model.id;
    let reason;
    if (constraints.provider && constraints.provider !== provider.id) reason = "provider-constraint";
    else if (constraints.model && constraints.model !== model.id) reason = "model-constraint";
    else if (!model.automaticEligible && !explicit) reason = "explicit-only-model";
    else if (!model.capabilityFloors.includes(request.capabilityFloor)) reason = "capability-floor";
    else if (!model.efforts.includes(request.reasoning)) reason = "catalog-effort";
    else if (!inventory?.available) reason = "unavailable";
    else if (!inventory.efforts.includes(request.reasoning)) reason = "inventory-effort";
    if (reason) {
      excluded.push({ actionId, reason });
      continue;
    }
    const estimate = candidateEstimate(provider, model, request.reasoning, serviceClass, evidence, catalog.qualityPolicy);
    if (estimate.evidenceStatus === "quality-floor" && !explicit) {
      excluded.push({ actionId, reason: "quality-floor" });
      continue;
    }
    candidates.push(estimate);
  }
  candidates.sort((left, right) => {
    for (const metric of objective) {
      const compared = compareMetric(left, right, metric);
      if (compared) return compared;
    }
    return left.actionId.localeCompare(right.actionId);
  });
  if (candidates.length === 0)
    throw new Error(`no live model satisfies ${request.capabilityFloor}/${request.reasoning}/${request.serviceClass}`);
  const ranked = candidates.map((candidate, index) => ({
    ...candidate,
    rank: index + 1,
    reason: `${serviceClass}:${objective.join(">")};evidence=${candidate.evidenceStatus};policy=${catalog.policyRevision}`,
  }));
  return Object.freeze({
    version: MODEL_SELECTION_PLAN_VERSION,
    policyRevision: catalog.policyRevision,
    requirements: Object.freeze({
      capabilityFloor: request.capabilityFloor,
      serviceClass,
      reasoning: request.reasoning,
    }),
    selected: Object.freeze({
      provider: ranked[0].provider,
      model: ranked[0].model,
      effort: ranked[0].effort,
      reason: ranked[0].reason,
    }),
    ranked: Object.freeze(ranked),
    excluded: Object.freeze(excluded.sort((left, right) => left.actionId.localeCompare(right.actionId))),
  });
}

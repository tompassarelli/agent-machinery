import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export {
  CAPABILITY_IMPLICATIONS,
  STAFFING_CATALOG_SCHEMA_ID,
  effectiveCapabilities,
  effectiveFilesystemAuthority,
  loadStaffingCatalog,
  validateCapabilityClosure,
  validatePostureCapabilities,
  validateStaffingCatalog,
  validateTopologyCapabilities,
} from "./scripts/staffing-catalog.mjs";
export {
  ROUTING_REQUEST_SCHEMA_ID,
  CONTRACT_FIELDS,
  OVERRIDE_FIELDS,
  ROUTING_FIELDS,
  effectivePreset,
  templateOverrides,
  validateRoutingRequest,
} from "./scripts/routing-request.mjs";
export {
  EXCEPTION_CODES,
  REASONING_LEVELS,
  SELECTION_ASSESSMENT_SCHEMA_ID,
  SELECTION_ASSESSMENT_VERSION,
  SIGNAL_VALUES,
  TIERS,
  assertAssessmentSelection,
  deriveSelectionAssessment,
  validateSelectionAssessment,
  validateSelectionSignals,
} from "./scripts/selection-assessment.mjs";
export { AGENT_SOURCE_PATHS, buildAgents, renderAgent } from "./scripts/build-agents.mjs";

export const packageRoot = dirname(fileURLToPath(import.meta.url));
export const catalogPath = resolve(packageRoot, "catalog.json");
export const CATALOG_SCHEMA_ID = "urn:agent-machinery:schema:catalog:v1";

export function loadExportCatalog(path = catalogPath) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function assetPath(relativePath) {
  if (typeof relativePath !== "string" || !relativePath ||
      relativePath.startsWith("/") || relativePath.split("/").includes(".."))
    throw new Error("asset path must be a contained package-relative path");
  return resolve(packageRoot, relativePath);
}

export function schemaPath(schemaId, catalog = loadExportCatalog()) {
  const candidates = new Set([
    ...catalog.assets.map(({ path }) => path),
    ...catalog.contracts.map(({ schema }) => schema),
  ]);
  for (const relativePath of candidates) {
    if (!relativePath.endsWith(".schema.json")) continue;
    const path = assetPath(relativePath);
    if (JSON.parse(readFileSync(path, "utf8")).$id === schemaId) return path;
  }
  throw new Error(`unknown schema ID: ${schemaId}`);
}

import type { SyncifyProjectConfig } from "../types/syncify";

const DEFAULT_PROJECT_CONFIG: SyncifyProjectConfig = {
  extensionName: process.env.SYNCIFY_EXTENSION_NAME ?? "Syncify",
  workerUrl:
    process.env.SYNCIFY_WORKER_URL ?? "https://syncify-worker.wsoltani.com",
  githubUrl:
    process.env.SYNCIFY_GITHUB_URL ?? "https://github.com/wSoltani/Syncify",
  kofiUrl: process.env.SYNCIFY_KOFI_URL ?? "https://ko-fi.com/wsoltani",
  issueUrl:
    process.env.SYNCIFY_ISSUE_URL ??
    "https://github.com/wSoltani/Syncify/issues/new",
};

export function getProjectConfig(): SyncifyProjectConfig {
  const runtimeConfig = (
    window as Window & {
      SyncifyConfig?: Partial<SyncifyProjectConfig>;
    }
  ).SyncifyConfig;

  return {
    extensionName:
      normalizeUrl(runtimeConfig?.extensionName) ??
      DEFAULT_PROJECT_CONFIG.extensionName,
    workerUrl:
      normalizeUrl(runtimeConfig?.workerUrl) ??
      DEFAULT_PROJECT_CONFIG.workerUrl,
    githubUrl:
      normalizeUrl(runtimeConfig?.githubUrl) ??
      DEFAULT_PROJECT_CONFIG.githubUrl,
    kofiUrl:
      normalizeUrl(runtimeConfig?.kofiUrl) ?? DEFAULT_PROJECT_CONFIG.kofiUrl,
    issueUrl:
      normalizeUrl(runtimeConfig?.issueUrl) ?? DEFAULT_PROJECT_CONFIG.issueUrl,
  };
}

function normalizeUrl(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

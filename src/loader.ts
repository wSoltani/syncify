import {
  fetchLatestVersion,
  isBetaChannel,
  isReleaseVersion,
  type LoaderInfo,
} from "./core/releases";

// dist/syncify.js: the file Marketplace and manual installs run. It loads the
// latest release from jsDelivr, so it rarely needs to change itself.
//
// The releases bucket only names a version. The address is always built here
// and always points at this repo, so the bucket can pick an existing tag but
// never load other code.
const CDN_URL = "https://cdn.jsdelivr.net/gh/wSoltani/syncify";
const BUNDLE_PATH = "dist/syncify.bundle.js";
const RELEASES_URL =
  process.env.SYNCIFY_RELEASES_URL ?? "https://syncify-releases.wsoltani.com";
// The last release loaded, used when the version pointer can't be read.
const REMEMBERED_VERSION_KEY = "syncify:loader-version";

type LoaderWindow = Window & { SyncifyLoader?: LoaderInfo };

(async function load() {
  const page = window as LoaderWindow;
  // Marketplace and a manual copy both installed: load once.
  if (page.SyncifyLoader) return;

  const info: LoaderInfo = {
    channel: isBetaChannel() ? "beta" : "stable",
    version: null,
  };
  page.SyncifyLoader = info;

  const latest = await fetchLatestVersion(RELEASES_URL);
  const remembered = readRemembered();
  const versions = [latest, remembered].filter(
    (version, index, all): version is string =>
      isReleaseVersion(version) && all.indexOf(version) === index,
  );

  for (const version of versions) {
    if (await loadScript(`${CDN_URL}@v${version}/${BUNDLE_PATH}`)) {
      info.version = version;
      remember(version);
      return;
    }
  }

  // Nothing else worked: the build on master, so Syncify still starts.
  if (!(await loadScript(`${CDN_URL}@master/${BUNDLE_PATH}`))) {
    console.warn("[Syncify]", "Could not load Syncify");
  }
})();

function loadScript(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      script.remove();
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

function readRemembered(): string | null {
  try {
    return window.localStorage.getItem(REMEMBERED_VERSION_KEY);
  } catch {
    return null;
  }
}

function remember(version: string): void {
  try {
    window.localStorage.setItem(REMEMBERED_VERSION_KEY, version);
  } catch {
    // Private storage unavailable: the pointer is read again next time.
  }
}

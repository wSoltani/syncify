import { getProjectConfig } from "../../core/projectConfig";
import { Button, Meta } from "../kit";
import { openExternal } from "./openExternal";

/** The version, a newer one when it's out, and where to get help. */
export function WindowFooter(props: {
  newerVersion: string | null;
  /** The loader fetches the latest release on reload; other copies are replaced by hand. */
  loadedByLoader: boolean;
}) {
  const project = getProjectConfig();
  const links: [string, string][] = [
    ["Report an issue", project.issueUrl],
    ["GitHub", project.githubUrl],
    ["Discord", project.discordUrl],
    ["Support on Ko-fi", project.kofiUrl],
  ];

  return (
    <footer className="syncify-window-footer">
      <span className="syncify-window-footer-version">
        <span>Syncify {project.version}</span>
        {props.newerVersion ? (
          <Button
            variant="text"
            size="tiny"
            className="syncify-window-update"
            onClick={() =>
              props.loadedByLoader
                ? window.location.reload()
                : openExternal(`${project.githubUrl}#updating`)
            }
          >
            <Meta parts={[`${props.newerVersion} is out`, props.loadedByLoader ? "Reload" : "How to update"]} />
          </Button>
        ) : null}
      </span>
      <span className="syncify-window-footer-links">
        {links.map(([label, url]) => (
          <Button key={label} variant="subtle" size="tiny" onClick={() => openExternal(url)}>
            {label}
          </Button>
        ))}
      </span>
    </footer>
  );
}

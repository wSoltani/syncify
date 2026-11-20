import { getProjectConfig } from "../../core/projectConfig";
import { Button, Meta } from "../kit";
import { openExternal } from "./openExternal";

/** The version, a newer one when it's out, where to get help, and the privacy note and terms. */
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
  const legal: [string, string][] = [
    ["Privacy", `${project.webUrl}/privacy`],
    ["Terms", `${project.webUrl}/terms`],
  ];

  return (
    <footer className="syncify-window-footer">
      <span className="syncify-window-footer-version">
        <Meta
          className="syncify-window-footer-about"
          parts={[
            `Syncify ${project.version}`,
            ...legal.map(([label, url]) => (
              <Button
                key={label}
                variant="subtle"
                size="tiny"
                className="syncify-window-footer-legal"
                onClick={() => openExternal(url)}
              >
                {label}
              </Button>
            )),
          ]}
        />
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

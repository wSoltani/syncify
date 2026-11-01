/**
 * The Secure nudge's launch panel, shown once per install when Spotify starts
 * on a backup with no account. Secure opens Syncify to secure it.
 */
export function NudgeNotice(props: { onSecure(): void; onClose(): void }) {
  const React = Spicetify.React;
  return (
    <div className="syncify-panel">
      <p className="syncify-claim-notice">
        Your backup isn't secured yet. Anyone who knows your Spotify username
        can restore it or claim it as theirs. Secure it with your email so only
        you can.
      </p>
      <div className="syncify-actions">
        <button
          className="syncify-text-button"
          type="button"
          onClick={props.onClose}
        >
          Not now
        </button>
        <button className="syncify-button" type="button" onClick={props.onSecure}>
          Secure
        </button>
      </div>
    </div>
  );
}

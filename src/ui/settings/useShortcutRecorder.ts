import { useEffect, useState } from "react";
import { formatShortcut, isShortcutTaken, shortcutFromEvent } from "../../core/shortcut";
import type { SyncifyShortcut } from "../../types/syncify";
import { useLatest } from "../useLatest";

/**
 * Records a new keyboard shortcut from the next key combination pressed.
 * `keyId` is the key button's id: once it's gone, the window closed.
 */
export function useShortcutRecorder(keyId: string, onRecorded: (shortcut: SyncifyShortcut) => void) {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recorded = useLatest(onRecorded);

  // Capture phase on window runs before Mousetrap (bubble phase on document),
  // so recording never triggers the current shortcut or Spotify's own ones.
  useEffect(() => {
    if (!recording) return;

    const onKeyDown = (event: KeyboardEvent) => {
      // The window was closed while recording: stop, and let the key through.
      if (!document.getElementById(keyId)?.isConnected) {
        setRecording(false);
        setError(null);
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();

      const result = shortcutFromEvent(event);
      if (result.kind === "ignore") return;
      if (result.kind === "cancel") {
        setRecording(false);
        setError(null);
        return;
      }
      if (result.kind === "error") {
        setError(result.message);
        return;
      }
      if (isShortcutTaken(result.shortcut)) {
        setError(
          `${formatShortcut(result.shortcut)} is already used by Spotify or another extension. Try a different combo.`,
        );
        return;
      }

      setRecording(false);
      recorded.current(result.shortcut);
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [recording, keyId, recorded]);

  return {
    recording,
    error,
    clearError: () => setError(null),
    /** The key button: starts recording, or stops it. */
    toggle: () => {
      setError(null);
      setRecording(!recording);
    },
  };
}

import { useState } from "react";
import { PairingCodeError } from "../../api/syncifyApi";
import { loadConfig } from "../../core/config";
import { cleanPairingCode, PAIRING_CODE_LENGTH } from "../../core/pairingCode";
import { answerWaitingInstall } from "../../core/syncService";
import type { SyncifyWaitingInstall } from "../../types/syncify";
import { INSTALL_CODE_TEXT, installAnswerToast } from "../claimText";
import { Button, Field } from "../kit";

/**
 * The answer about another Syncify's backups on this Spotify username: Not
 * me at once, or That's me, which asks for that Syncify's code first. The
 * launch notice and Syncify's window both ask with it.
 */
export function useInstallAnswer(
  install: SyncifyWaitingInstall,
  options: {
    /** The answer went through. */
    onDone(): void | Promise<void>;
    /** Shows a failure that isn't about the code; without it, `error` holds it. */
    onError?(error: unknown): void;
  },
) {
  const [step, setStep] = useState<"ask" | "code">("ask");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const typed = cleanPairingCode(code);

  async function send(answer: { action: "approve"; code: string } | { action: "reject" }) {
    setBusy(true);
    setError(null);
    setCodeError(null);
    try {
      await answerWaitingInstall(loadConfig(), install.id, answer);
      Spicetify.showNotification(installAnswerToast(answer.action));
      await options.onDone();
      setStep("ask");
      setCode("");
    } catch (caught) {
      // What was typed stays, with what's wrong under it.
      if (caught instanceof PairingCodeError) setCodeError(caught.message);
      else if (options.onError) options.onError(caught);
      else setError(caught instanceof Error ? caught.message : String(caught));
    } finally {
      setBusy(false);
    }
  }

  return {
    step,
    code,
    busy,
    error,
    codeError,
    /** The whole code is typed. */
    complete: typed.length === PAIRING_CODE_LENGTH,
    setCode(next: string) {
      setCode(next);
      setCodeError(null);
    },
    askForCode: () => setStep("code"),
    back() {
      setStep("ask");
      setCodeError(null);
    },
    notMe: () => void send({ action: "reject" }),
    confirm() {
      if (typed.length === PAIRING_CODE_LENGTH && !busy) void send({ action: "approve", code: typed });
    },
  };
}

type InstallAnswer = ReturnType<typeof useInstallAnswer>;

/** Where the code is, and the field for it. */
export function InstallCodeStep(props: { answer: InstallAnswer }) {
  const { answer } = props;
  return (
    <>
      <p>{INSTALL_CODE_TEXT}</p>
      <Field
        label="Code"
        value={answer.code}
        onChange={answer.setCode}
        error={answer.codeError}
        // Room for a space or a dash between its halves.
        maxLength={PAIRING_CODE_LENGTH + 1}
        disabled={answer.busy}
        mono
        autoFocus
      />
    </>
  );
}

/** Back, and That's me once the whole code is typed. */
export function InstallCodeActions(props: { answer: InstallAnswer }) {
  const { answer } = props;
  return (
    <>
      <Button variant="secondary" onClick={answer.back} disabled={answer.busy}>
        Back
      </Button>
      <Button type="submit" disabled={answer.busy || !answer.complete}>
        That's me
      </Button>
    </>
  );
}

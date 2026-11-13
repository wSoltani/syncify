import { useEffect, useRef, type ReactNode } from "react";
import { useStableId } from "./useStableId";

export interface DialogContentProps {
  title: ReactNode;
  /** One or two short sentences: what happens, and what is lost. */
  children: ReactNode;
  /** Two buttons: the safe one first, the action last. */
  actions: ReactNode;
  titleId?: string;
}

/**
 * A dialog's layout: title, sentence, buttons. Launch notices use it inside
 * Spotify's own popup; Dialog puts it in Syncify's window.
 */
export function DialogContent(props: DialogContentProps) {
  return (
    <div className="syncify-dialog-content">
      <h2 className="syncify-dialog-title" id={props.titleId}>
        {props.title}
      </h2>
      <div className="syncify-dialog-text">{props.children}</div>
      <div className="syncify-dialog-actions">{props.actions}</div>
    </div>
  );
}

export interface DialogProps extends Omit<DialogContentProps, "titleId"> {
  open: boolean;
  /** Escape, or the safe button: nothing happens. */
  onClose(): void;
}

/**
 * Only when the flow can't go on without an answer. The rest of the window
 * can't be reached while it's open, and focus goes back where it was.
 */
export function Dialog(props: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useStableId("dialog");
  const { open, onClose } = props;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const returnTo = document.activeElement;
    if (!dialog.open) dialog.showModal();
    const onCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      if (dialog.open) dialog.close();
      if (returnTo instanceof HTMLElement && returnTo.isConnected) returnTo.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <dialog className="syncify-dialog" ref={ref} aria-labelledby={titleId}>
      <DialogContent title={props.title} actions={props.actions} titleId={titleId}>
        {props.children}
      </DialogContent>
    </dialog>
  );
}

import { useEffect, type ReactNode } from "react";
import { useDashboard } from "../../contexts/useTeacherData";

export default function Dialog({
  ref,
  cancel,
  children,
}: {
  ref: React.RefObject<HTMLDialogElement | null>;
  cancel: () => void;
  children: ReactNode;
}) {
  const { closeDialog } = useDashboard();

  // Close dialog when clicking outside
  const handleClickOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = ref?.current;
    if (dialog && e.target === dialog) {
      closeDialog(ref);
    }
  };

  useEffect(() => {
    const dialog = ref?.current;
    if (!dialog) return;

    dialog.addEventListener("cancel", cancel);

    return () => {
      dialog.removeEventListener("cancel", cancel);
    };
  }, [ref, cancel]);

  return (
    <dialog
      ref={ref}
      onClick={handleClickOutside}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/0 backdrop:backdrop-blur-xs open:backdrop:bg-black/50 transition-all rounded"
    >
      <div className="flex flex-col gap-4 px-4 pt-4 pb-6">{children}</div>
    </dialog>
  );
}

import { useEffect } from "react";
import { useBookings } from "../../../contexts/useBookings";

export default function PopUpDialog({
  h2,
  popUpMessage,
  btnText,
  fn,
}: {
  h2: string | undefined;
  popUpMessage: string | undefined;
  btnText: string | undefined;
  fn: () => void;
}) {
  const { dialogRef, setSelectedSlot, closeDialog } = useBookings();

  const deleteBtn = btnText === "delete";

  // Close dialog when clicking outside
  const handleClickOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef?.current;
    if (dialog && e.target === dialog) {
      closeDialog();
    }
  };

  useEffect(() => {
    const dialog = dialogRef?.current;
    if (!dialog) return;

    const handleCancel = () => {
      setSelectedSlot(null);
    };

    dialog.addEventListener("cancel", handleCancel);

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [dialogRef, setSelectedSlot]);

  return (
    <dialog
      ref={dialogRef}
      onClick={handleClickOutside}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/0 backdrop:backdrop-blur-xs open:backdrop:bg-black/50 transition-all rounded"
    >
      <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
        <h2>{h2}</h2>
        <p className="text-lg">{popUpMessage}</p>
        <div className="flex justify-around">
          <button onClick={closeDialog}>close</button>
          <button
            className={`${deleteBtn ? "bg-red-400" : "bg-jade"}`}
            onClick={() => fn()}
          >
            {btnText}
          </button>
        </div>
      </div>
    </dialog>
  );
}

import { useEffect, type ReactNode } from "react";
import { DialogContext } from "./DialogTypes";
import VideoSectionDialog from "../sections/VideoSectionDialog";
import { useDashboard } from "../../useTeacherData";
import ReviewsSectionDialog from "../sections/ReviewsSectionDialog";
import OffersSectionDialog from "../sections/OffersSectionDialog";
import HeroSectionDialog from "../sections/HeroSectionDialog";
import EmptyOfferDialog from "../sections/EmptyOfferDialog";
import HeroLanguages from "../sections/HeroLanguages";
import HeroSubjects from "../sections/HeroSubjects";
import HeroYears from "../sections/HeroYears";

export function Dialogs({ children }: { children: ReactNode }) {
  const { dialogDashboard } = useDashboard();

  // Close by clicking on button
  const closeDialog = (
    ref: React.RefObject<HTMLDialogElement | null>,
  ): void => {
    ref?.current?.close();
  };

  function openDialog(ref: React.RefObject<HTMLDialogElement | null>) {
    ref?.current?.showModal();
  }

  // Close dialog when clicking outside
  const handleClickOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogDashboard?.current;
    if (dialog && e.target === dialog) {
      closeDialog(dialogDashboard);
    }
  };

  useEffect(() => {
    const dialog = dialogDashboard?.current;
    if (!dialog) return;
    const cancel = () => null;

    dialog.addEventListener("cancel", cancel);

    return () => {
      dialog.removeEventListener("cancel", cancel);
    };
  }, [dialogDashboard]);
  return (
    <DialogContext.Provider value={{ closeDialog, openDialog }}>
      <dialog
        ref={dialogDashboard}
        onClick={handleClickOutside}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/0 backdrop:backdrop-blur-xs open:backdrop:bg-black/50 transition-all rounded px-6 min-w-[50%] max-[400px]:pl-0 max-[500px]:w-full"
      >
        {children}
      </dialog>
    </DialogContext.Provider>
  );
}

Dialogs.VideoSection = VideoSectionDialog;
Dialogs.ReviewsSection = ReviewsSectionDialog;
Dialogs.OffersSection = OffersSectionDialog;
Dialogs.HeroSection = HeroSectionDialog;
Dialogs.EmptyOffer = EmptyOfferDialog;
Dialogs.HeroLanguages = HeroLanguages;
Dialogs.HeroSubjects = HeroSubjects;
Dialogs.HeroYears = HeroYears;

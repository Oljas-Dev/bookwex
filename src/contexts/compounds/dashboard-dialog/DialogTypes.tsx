import { createContext } from "react";

interface DialogType {
  //   dialogDashboard: React.RefObject<HTMLDialogElement | null>;
  closeDialog: (ref: React.RefObject<HTMLDialogElement | null>) => void;
  openDialog: (ref: React.RefObject<HTMLDialogElement | null>) => void;
}

export const DialogContext = createContext<DialogType | undefined>(undefined);

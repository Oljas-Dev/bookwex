import { createContext, type Dispatch, type SetStateAction } from "react";

type Exception =
  | {
      type: "exclude";
      date: string; // "YYYY-MM-DD"
    }
  | {
      type: "override";
      date: string;
      startTime: string;
      endTime: string;
    };

type Slot = {
  id: string;
  user_id: string;
  start_time: string; // ISO UTC datetime
  end_time: string; // ISO UTC datetime
  duration: number;
  buffer?: number;
  status: string;
};

interface BookingTypes {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  availableSlots: Slot[];
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  selectedDays: number[];
  duration: 0 | 30 | 60 | 45;
  buffer: number;
  noUserError: boolean;
  selectedSlot: string | null;
  setSelectedSlot: Dispatch<SetStateAction<string | null>>;
  setNoUserError: Dispatch<SetStateAction<boolean>>;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  setStartTime: Dispatch<SetStateAction<string>>;
  setEndTime: Dispatch<SetStateAction<string>>;
  setSelectedDays: Dispatch<SetStateAction<number[]>>;
  setDuration: Dispatch<SetStateAction<0 | 30 | 60 | 45>>;
  setBuffer: Dispatch<SetStateAction<number>>;

  // Functions
  closeDialog: () => void;

  // Testing slots generation form
  generateSlots: (form: RecurringFormState) => Slot[];
  filterAvailableSlots: (slots: Slot[], bookedSlots: Slot[]) => Slot[];
  bookedSlots: Slot[];
  uniqueSelectedDays: number[];
}

type RecurringFormState = {
  startDate: string;
  endDate: string;
  selectedDays: number[];
  startTime: string;
  endTime: string;
  duration: 0 | 30 | 60 | 45;
  buffer: number;
  exceptions?: Exception[];
};

export type WeekFormState = {
  weekStart: string; // ISO date (Monday)
  selectedDays: number[]; // [1, 3, 5] => Mon, Wed, Fri
  startTime: string;
  endTime: string;
  duration: 0 | 30 | 60 | 45;
  buffer: number;
};

export type { Slot, RecurringFormState };
export type { BookingTypes };

export const BookingContext = createContext<BookingTypes | undefined>(
  undefined,
);

import { createContext, type Dispatch, type SetStateAction } from "react";
import type { DialogStateProps } from "../components/calendarComponents/CheckTimeSlots";
import type { Dayjs } from "dayjs";

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
  user_id: string | undefined;
  start_time: string; // ISO UTC datetime
  end_time: string; // ISO UTC datetime
  duration: number;
  buffer?: number;
  status: string;
  booked_by?: string;
};

interface Booking {
  id: string;
  slot_id: string;
  booked_by: string;
  start_time: string;
  duration: number;
  type: string;
  user_id: string | undefined;
}

interface bookedSlots {
  id?: string;
  teacher_id: string;
  student_id: string | undefined;
  start_time: string;
  slot_id: string;
  duration: number;
  type: string;
}

interface BookingWithStudent extends Booking {
  student: {
    fullName: string;
    avatarUrl: string | null;
  };
}

export const LESSON_DURATIONS = [30, 45, 60] as const;

export type LessonDuration = 0 | (typeof LESSON_DURATIONS)[number];

interface BookingTypes {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  dialogConfig: DialogConfigTypes | null;
  dialogFormRef: React.RefObject<HTMLDialogElement | null>;
  dialogReviewForm: React.RefObject<HTMLDialogElement | null>;
  availableSlots: Slot[];
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  selectedDays: number[];
  duration: LessonDuration;
  buffer: number;
  noUserError: boolean;
  selectedSlot: string | null;
  setSelectedSlot: Dispatch<SetStateAction<string | null>>;
  setNoUserError: Dispatch<SetStateAction<boolean>>;
  setStartDate: Dispatch<SetStateAction<Dayjs | null>>;
  setEndDate: Dispatch<SetStateAction<Dayjs | null>>;
  setStartTime: Dispatch<SetStateAction<Dayjs | null>>;
  setEndTime: Dispatch<SetStateAction<Dayjs | null>>;
  setSelectedDays: Dispatch<SetStateAction<number[]>>;
  setDuration: Dispatch<SetStateAction<LessonDuration>>;
  setBuffer: Dispatch<SetStateAction<number>>;

  // Functions
  closeDialog: () => void;
  openDialog: (
    lessonId: string | undefined,
    type: keyof DialogStateProps,
  ) => void;

  // Testing slots generation form
  generateSlots: (form: RecurringFormState) => Slot[];
  filterAvailableSlots: (slots: Slot[], bookedSlots: Slot[]) => Slot[];
  bookedSlots: Slot[];
  uniqueSelectedDays: number[];
}

type RecurringFormState = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  selectedDays: number[];
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  duration: 0 | 30 | 60 | 45;
  buffer: number;
  exceptions?: Exception[];
};

interface DialogConfigTypes {
  lessonId: string | undefined;
  type: keyof DialogStateProps;
}

type WeekFormState = {
  weekStart: string; // ISO date (Monday)
  selectedDays: number[]; // [1, 3, 5] => Mon, Wed, Fri
  startTime: string;
  endTime: string;
  duration: 0 | 30 | 60 | 45;
  buffer: number;
};

export type {
  Slot,
  RecurringFormState,
  DialogConfigTypes,
  Booking,
  BookingTypes,
  bookedSlots,
  BookingWithStudent,
  WeekFormState,
};

export const BookingContext = createContext<BookingTypes | undefined>(
  undefined,
);

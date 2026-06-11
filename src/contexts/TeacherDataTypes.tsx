import { createContext, type Dispatch, type SetStateAction } from "react";
import type { SocialLink, TeacherLesson } from "../types/ui";

export interface TeacherContextTypes {
  dialogDashboard: React.RefObject<HTMLDialogElement | null>;
  closeDialog: (ref: React.RefObject<HTMLDialogElement | null>) => void;
  openDialog: (ref: React.RefObject<HTMLDialogElement | null>) => void;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;

  // HeroSectionDialog states
  startYear: string | undefined;
  setStartYear: Dispatch<SetStateAction<string | undefined>>;
  languages: string | undefined;
  setLanguages: Dispatch<SetStateAction<string | undefined>>;
  hours: string | undefined;
  setHours: Dispatch<SetStateAction<string | undefined>>;
  title: string | undefined;
  setTitle: Dispatch<SetStateAction<string | undefined>>;
  content: string | undefined;
  setContent: Dispatch<SetStateAction<string | undefined>>;
  socialLinks: SocialLink[] | [];
  setSocialLinks: Dispatch<SetStateAction<SocialLink[] | []>>;
  lessons: TeacherLesson[] | undefined;
  setLessons: Dispatch<SetStateAction<TeacherLesson[] | undefined>>;
}

export const TeacherDataContext = createContext<
  TeacherContextTypes | undefined
>(undefined);

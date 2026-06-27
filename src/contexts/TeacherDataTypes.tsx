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
  languages: string;
  setLanguages: Dispatch<SetStateAction<string>>;
  hours: string | undefined;
  setHours: Dispatch<SetStateAction<string | undefined>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  socialLinks: SocialLink[] | [];
  setSocialLinks: Dispatch<SetStateAction<SocialLink[] | []>>;
  lessons: TeacherLesson[] | undefined;
  setLessons: Dispatch<SetStateAction<TeacherLesson[] | undefined>>;
}

export const TeacherDataContext = createContext<
  TeacherContextTypes | undefined
>(undefined);

import { createContext, type Dispatch, type SetStateAction } from "react";

export type lessonStatuses = "upcoming" | "pending" | "completed" | "disputed";

export interface bookingConfig {
  role: string | undefined;
  status: lessonStatuses;
}

export type activeTabs = "my_teaching" | "my_learning";

type LessonContextType = {
  lessonStatus: lessonStatuses;
  setLessonStatus: Dispatch<SetStateAction<lessonStatuses>>;
  activeTab: activeTabs;
  setActiveTab: Dispatch<SetStateAction<activeTabs>>;
  rating: number | undefined;
  setRating: Dispatch<SetStateAction<number | undefined>>;
  activeLessonId: string | undefined;
  setActiveLessonId: Dispatch<SetStateAction<string | undefined>>;
  currentReview: string | undefined;
  setCurrentReview: Dispatch<SetStateAction<string | undefined>>;
};

export const LessonSectionContext = createContext({} as LessonContextType);

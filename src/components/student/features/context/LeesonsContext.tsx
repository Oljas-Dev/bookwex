import { useState, type ReactNode } from "react";
import {
  LessonSectionContext,
  type activeTabs,
  type lessonStatuses,
} from "./LessonsContextData";

export function LessonProvider({ children }: { children: ReactNode }) {
  const [lessonStatus, setLessonStatus] = useState<lessonStatuses>("upcoming");
  const [activeTab, setActiveTab] = useState<activeTabs>("my_teaching");
  const [rating, setRating] = useState<number | undefined>();
  const [activeLessonId, setActiveLessonId] = useState<string | undefined>();
  const [currentReview, setCurrentReview] = useState<string | undefined>();

  return (
    <LessonSectionContext.Provider
      value={{
        lessonStatus,
        setLessonStatus,
        activeTab,
        setActiveTab,
        rating,
        setRating,
        activeLessonId,
        setActiveLessonId,
        currentReview,
        setCurrentReview,
      }}
    >
      {children}
    </LessonSectionContext.Provider>
  );
}

import { useContext } from "react";
import { LessonSectionContext } from "./LessonsContextData";

export function useCards() {
  const context = useContext(LessonSectionContext);

  if (context === undefined)
    throw new Error("Context cannot be used outside the Provider");

  return context;
}

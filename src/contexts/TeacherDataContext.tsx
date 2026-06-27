import { useRef, useState, type ReactNode } from "react";
import { TeacherDataContext } from "./TeacherDataTypes";
import type { SocialLink, TeacherLesson } from "../types/ui";

export function TeacherDataProvider({ children }: { children: ReactNode }) {
  // Deciding which dialog to open on Dashboard
  const [active, setActive] = useState("");

  // Statefull logic for a HeroSectionDialog
  const [startYear, setStartYear] = useState<string | undefined>("");
  const [languages, setLanguages] = useState("");
  const [hours, setHours] = useState<string | undefined>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[] | []>([]);

  // Statefull logic for an Offer Section Dialog
  const [lessons, setLessons] = useState<TeacherLesson[] | undefined>(
    undefined,
  );

  // Dashboard dialog
  const dialogDashboard = useRef<HTMLDialogElement | null>(null);

  // Close by clicking on button
  const closeDialog = (
    ref: React.RefObject<HTMLDialogElement | null>,
  ): void => {
    ref?.current?.close();
  };

  function openDialog(ref: React.RefObject<HTMLDialogElement | null>) {
    ref?.current?.showModal();
  }

  return (
    <TeacherDataContext.Provider
      value={{
        dialogDashboard,
        closeDialog,
        openDialog,
        active,
        setActive,
        startYear,
        setStartYear,
        languages,
        setLanguages,
        hours,
        setHours,
        title,
        setTitle,
        content,
        setContent,
        socialLinks,
        setSocialLinks,
        lessons,
        setLessons,
      }}
    >
      {children}
    </TeacherDataContext.Provider>
  );
}

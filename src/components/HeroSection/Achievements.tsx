import dayjs from "dayjs";
import type { TeacherExperience } from "../../types/ui";
import { useAuth } from "../../contexts/useAuth";
import { useDashboard } from "../../contexts/useTeacherData";
import LanguageCard from "./ui/LanguageCard";
import SubjectCard from "./ui/SubjectCard";
import YearsCard from "./ui/YearsCard";

export default function Achievements({
  experience,
  teacherId,
}: {
  experience: TeacherExperience | undefined;
  teacherId: string | undefined;
}) {
  const { canEditProfile } = useAuth();
  const { setActive, openDialog, dialogDashboard } = useDashboard();
  const startYear = experience?.start_year;

  const yearsDiff = startYear ? dayjs().year() - startYear : 0;

  const years = `${yearsDiff}`;

  function openLanguagesDialog(id: string) {
    setActive(id);
    openDialog(dialogDashboard);
  }

  return (
    <div className="flex justify-between px-2">
      <YearsCard
        canEditProfile={canEditProfile}
        value={years}
        openLanguagesDialog={openLanguagesDialog}
        teacherId={teacherId}
      />

      <LanguageCard
        canEditProfile={canEditProfile}
        languages={experience?.languages}
        openLanguagesDialog={openLanguagesDialog}
        teacherId={teacherId}
      />

      <SubjectCard
        canEditProfile={canEditProfile}
        subjects={experience?.subjects}
        openLanguagesDialog={openLanguagesDialog}
        teacherId={teacherId}
      />
    </div>
  );
}

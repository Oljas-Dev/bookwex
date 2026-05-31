import DisplayLessonInfo from "../lessons-card/DisplayLessonInfo";
import UserDisplay from "../lessons-card/UserDiplay";
import type { LessonCard } from "../../../../types/ui";
import { useProfileById } from "../../../../api/features/useProfileById";

export type StudentCard =
  | {
      fullName?: string;
      avatarUrl?: string;
    }
  | undefined;

export default function StudentLessonGroup({ lesson }: { lesson: LessonCard }) {
  const { teacher } = useProfileById(lesson.teacherId);

  const user: StudentCard = {
    fullName: teacher?.full_name,
    avatarUrl: teacher?.avatar_url,
  };

  return (
    <div className="flex gap-6">
      <UserDisplay user={user} title="Teacher:" />

      <DisplayLessonInfo
        duration={lesson.duration}
        startTime={lesson.startTime}
      />
    </div>
  );
}

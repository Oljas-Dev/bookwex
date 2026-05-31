import type { BookedCard } from "../../../../types/ui";
import DisplayLessonInfo from "../lessons-card/DisplayLessonInfo";
import UserDisplay from "../lessons-card/UserDiplay";

export type StudentCard =
  | {
      fullName?: string;
      avatarUrl?: string;
    }
  | undefined;

export default function LessonGroup({ lesson }: { lesson: BookedCard }) {
  const user: StudentCard = {
    fullName: lesson.studentName,
    avatarUrl: lesson.studentsAvatar,
  };

  return (
    <div className="flex gap-6">
      <UserDisplay user={user} title="Student:" />

      <DisplayLessonInfo
        duration={lesson.duration}
        startTime={lesson.startTime}
      />
    </div>
  );
}

import type { BookedCard } from "../../../../types/ui";
import DisplayLessonInfo from "../students-card/DisplayLessonInfo";
import UserDisplay from "../students-card/UserDiplay";

export type StudentCard =
  | {
      fullName?: string;
      avatarUrl?: string | undefined;
    }
  | undefined;

export default function LessonGroup({ lesson }: { lesson: BookedCard }) {
  const user: StudentCard = {
    fullName: lesson.studentName,
    avatarUrl: lesson.studentsAvatar,
  };

  return (
    <div className="flex gap-6 max-[600px]:flex-col max-[600px]:gap-2 w-full">
      <UserDisplay user={user} title="Student:" />

      <DisplayLessonInfo
        duration={lesson.duration}
        startTime={lesson.startTime}
      />
    </div>
  );
}

import { capitalizeAllFirst } from "../../../../helpers/features";
import type { LessonCard } from "../../../../types/ui";
import { AvatarPlaceholder } from "../../../avatars/features/AvatarPlaceholder";
import { getAvatarUrl } from "../../../avatars/features/useAvatar";

export default function TeacherIdentity({ lesson }: { lesson: LessonCard }) {
  return (
    <div className="flex flex-col gap-1 items-center">
      <p className="max-[600px]:hidden">Teacher:</p>
      <AvatarPlaceholder
        styles="w-12 h-12 max-[600px]:w-32 max-[600px]:h-32"
        avatarUrl={getAvatarUrl(lesson.teacherAvatar)}
      />
      <div className="flex gap-2">
        <p>
          <strong>{capitalizeAllFirst(lesson.teacherName)}</strong>
        </p>
      </div>
    </div>
  );
}

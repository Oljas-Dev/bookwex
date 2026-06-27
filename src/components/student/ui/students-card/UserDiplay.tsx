import { capitalizeAllFirst } from "../../../../helpers/features";
import { AvatarPlaceholder } from "../../../avatars/features/AvatarPlaceholder";
import { getAvatarUrl } from "../../../avatars/features/useAvatar";
import type { StudentCard } from "../teachers-card/LessonGroup";

export default function UserDisplay({
  user,
  title,
}: {
  user: StudentCard;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-1 items-center">
      <p>{title}</p>
      <AvatarPlaceholder
        styles="w-12 h-12"
        avatarUrl={getAvatarUrl(user?.avatarUrl)}
      />
      <div className="flex gap-2">
        <p>
          <strong>{capitalizeAllFirst(user?.fullName)}</strong>
        </p>
      </div>
    </div>
  );
}

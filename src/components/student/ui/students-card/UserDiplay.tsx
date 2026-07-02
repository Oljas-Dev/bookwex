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
      <p className="max-[600px]:hidden">{title}</p>
      <AvatarPlaceholder
        styles="w-12 h-12 max-[600px]:w-32 max-[600px]:h-32"
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

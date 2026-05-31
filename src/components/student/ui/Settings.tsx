import { Link } from "react-router-dom";
import { useBookings } from "../../../contexts/useBookings";
import { AvatarPlaceholder } from "../../avatars/features/AvatarPlaceholder";
import { getAvatarUrl } from "../../avatars/features/useAvatar";
import type { Profile } from "../../../contexts/AuthContextData";
import { useAuth } from "../../../contexts/useAuth";
import { useProfileById } from "../../../api/features/useProfileById";
import { toParamStr } from "../../../helpers/features";

export default function Settings({
  user,
  status,
}: {
  user: Profile;
  status: boolean;
}) {
  const { isTeacher, user: currentTeacher } = useAuth();
  const { teacher, isPending } = useProfileById(currentTeacher?.id);
  const { dialogFormRef } = useBookings();

  if (status || isPending) return <p>loading user...</p>;

  // console.log(teacher);

  const avatarUrl = getAvatarUrl(user?.avatar_url);

  return (
    <aside className="flex flex-col items-center gap-1 [&_h3]:text-center">
      <div>
        <h3>My profile</h3>
        <div onClick={() => dialogFormRef?.current?.showModal()}>
          <AvatarPlaceholder
            name={user?.full_name || ""}
            avatarUrl={avatarUrl || null}
            styles="w-44 h-44 text-5xl transition-all duration-200 hover:scale-101 hover:shadow-[2px_2px_3px_var(--shadow-dark-card)] active:scale-95 active:shadow-none cursor-pointer"
          />
        </div>
      </div>

      <div
        onClick={() => dialogFormRef?.current?.showModal()}
        className="cursor-pointer"
      >
        <p className="hover:text-amber-100">edit profile</p>
      </div>
      <Link to="/change-password" className="text-lg hover:text-amber-100">
        change password
      </Link>
      {isTeacher && (
        <Link
          to={`/teacher/${toParamStr(teacher?.full_name)}/planner`}
          className="text-lg hover:text-amber-100"
        >
          schedule new lessons
        </Link>
      )}
    </aside>
  );
}

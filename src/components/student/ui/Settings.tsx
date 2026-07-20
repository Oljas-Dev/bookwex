import { Link } from "react-router-dom";
import { useBookings } from "../../../contexts/useBookings";
import { AvatarPlaceholder } from "../../avatars/features/AvatarPlaceholder";
import { getAvatarUrl } from "../../avatars/features/useAvatar";
import { useAuth } from "../../../contexts/useAuth";
import { toParamStr } from "../../../helpers/features";
import type { currentUser } from "../../../types/profile";

export default function Settings({ user }: { user: currentUser | undefined }) {
  const { isTeacher } = useAuth();
  const { dialogFormRef } = useBookings();

  return (
    <aside className="flex flex-col items-center gap-2 text-center [&_a]:leading-5">
      <div>
        <h3>My profile</h3>
        <div onClick={() => dialogFormRef?.current?.showModal()}>
          <AvatarPlaceholder
            name={user?.name || ""}
            avatarUrl={getAvatarUrl(user?.avatar) || null}
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
      <div className="flex flex-col gap-3">
        <Link
          to="/auth/change-password"
          className="text-lg hover:text-amber-100"
        >
          change password
        </Link>
        {isTeacher && (
          <Link
            to={`/teacher/${toParamStr(user?.name)}/planner`}
            className="text-lg hover:text-amber-100"
          >
            schedule new lessons
          </Link>
        )}
        {!isTeacher && (
          <Link
            to={"/auth/become-teacher"}
            className="text-lg hover:text-amber-100"
          >
            become a teacher
          </Link>
        )}
      </div>
    </aside>
  );
}

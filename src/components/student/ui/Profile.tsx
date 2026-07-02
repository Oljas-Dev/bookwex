import { capitalizeAllFirst } from "../../../helpers/features";
import { useAuth } from "../../../contexts/useAuth";
import type { Profile } from "../../../contexts/AuthContextData";
import type { currentUser } from "../../../types/profile";
import TeacherList from "./TeacherList";
import TeacherProfileView from "./teachers-card/TeacherProfileView";

export default function Profile({ user }: { user: currentUser | undefined }) {
  const { isTeacher } = useAuth();

  return (
    <div className="flex flex-col gap-3 max-[700px]:pr-2 ">
      <h2 className="pb-2 border-b border-jet max-[500px]:hidden">
        Hi👋, {capitalizeAllFirst(user?.name)}
      </h2>

      {isTeacher ? (
        <TeacherProfileView
          myTeachers={user?.myTeachers}
          teacherName={user?.name}
        />
      ) : (
        <TeacherList myTeachers={user?.myTeachers} />
      )}
    </div>
  );
}

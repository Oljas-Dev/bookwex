import type { JSX } from "@emotion/react/jsx-runtime";
import { capitalizeAllFirst, toParamStr } from "../../../helpers/features";
import MyTeachers from "./MyTeachers";
import { getAvatarUrl } from "../../avatars/features/useAvatar";
import { useAuth } from "../../../contexts/useAuth";
import type { Profile } from "../../../contexts/AuthContextData";
import { useTeachers } from "../../../api/features/useTeachers";

export default function Profile({ user }: { user: Profile }) {
  const { isTeacher } = useAuth();
  const { profiles, profilesLoading } = useTeachers();

  if (profilesLoading) return <p>waiting for profiles...</p>;
  // This is a support email in case of critical app error of no teachers found. To be changed with real support email.
  const support = "oljasmedetbaev@gmail.com";

  // Array to render student's teachers
  const myTeacher: JSX.Element[] = [];

  // Getting all teachers of the student from my_teachers array and pushing them into myTeacher array
  user?.my_teachers?.forEach((teacherId: string) => {
    const teacher = profiles?.find((t) => t.id === teacherId);

    if (!teacher) return;

    myTeacher.push(
      <MyTeachers
        key={teacherId}
        teacherName={teacher?.full_name}
        avatarUrl={getAvatarUrl(teacher?.avatar_url)}
        subject="English"
      />,
    );
  });

  return (
    <div className="flex flex-col gap-3">
      <h2>Hi👋, {capitalizeAllFirst(user?.full_name)}</h2>
      {myTeacher.length > 0 ? (
        <div>
          <p>Let's start learning, please, choose your teacher</p>
          <p>My teachers:</p>
          <ul className="mt-2">{myTeacher}</ul>
        </div>
      ) : (
        <p>
          No teachers were found, please reaload this page. If it doesn't help
          report the issue to{" "}
          <a href={`mailto:${support}`} className="text-blue-500 underline">
            support
          </a>
        </p>
      )}
      {isTeacher && (
        <a href={`teacher/${toParamStr(user?.full_name)}`}>
          <button className="hover:text-amber-100">go to your dashboard</button>
        </a>
      )}
    </div>
  );
}

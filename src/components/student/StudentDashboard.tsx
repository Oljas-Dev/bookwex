import useProfile from "../../api/features/useProfile";
import type { MyTeacherProps } from "../../contexts/AuthContextData";
import { useAuth } from "../../contexts/useAuth";
import { AvatarPlaceholder } from "../avatars/features/AvatarPlaceholder";
import { getAvatarUrl } from "../avatars/features/useAvatar";
import MyTeachers from "./MyTeachers";

export default function StudentDashboard() {
  const { profile } = useProfile();
  const { profile: student, loading } = useAuth();

  if (loading) return <p>loading student's data...</p>;

  const avatarUrl = getAvatarUrl(student?.avatar_url);

  return (
    <>
      <section className="grid grid-cols-[70%_30%] w-full bg-jade px-10 py-6 mb-8 [&_p]:text-lg">
        <div>
          <h2>Hi👋, {student?.full_name}</h2>
          <p>Let's start learning, please, choose your teacher</p>
          <p>My teachers:</p>

          <ul className="mt-2">
            {student?.my_teachers?.map((name: MyTeacherProps, i: number) => (
              <MyTeachers
                key={i}
                teacherName={name.full_name}
                subject={name.subject}
                avatarUrl={profile?.avatar_url || null}
              />
            ))}
          </ul>
        </div>
        <aside className="flex flex-col items-center gap-4 [&_h3]:text-center">
          <div>
            <h3>My profile</h3>
            <AvatarPlaceholder
              name={student?.full_name || ""}
              avatarUrl={avatarUrl || null}
              styles="w-44 h-44 text-5xl"
            />
          </div>

          <div>
            <h3>Home tasks</h3>
            <p>There are no home tasks for now. You are all up to date!</p>
          </div>
        </aside>
      </section>
    </>
  );
}

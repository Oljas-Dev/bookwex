import type { JSX } from "@emotion/react/jsx-runtime";
import { useAuth } from "../../contexts/useAuth";
import { AvatarPlaceholder } from "../avatars/features/AvatarPlaceholder";
import { getAvatarUrl } from "../avatars/features/useAvatar";
import MyTeachers from "./MyTeachers";
import EditPersonalInfo from "./features/EditPersonalInfo";
import { useRef } from "react";
import { capitalizeAllFirst, toParamStr } from "../../helpers/features";
import { useTeachers } from "../../api/features/useTeachers";
import useStudent from "../../api/features/useStudent";
import { Link } from "react-router-dom";
import { useStudentLessons } from "./features/useStudentLessons";
import MyLessons from "./MyLessons";

export default function StudentDashboard() {
  const { isTeacher, loading } = useAuth();
  const { profiles, profilesLoading } = useTeachers();
  const { student, isPendingStudent } = useStudent();
  const { studentLessons, isPending } = useStudentLessons();

  const dialogFormRef = useRef<HTMLDialogElement | null>(null);
  const support = "oljasmedetbaev@gmail.com";
  // const [lessons] = useState(studentLessons ? studentLessons : []);

  if (loading || profilesLoading || isPendingStudent || isPending) {
    return <p>loading student's data...</p>;
  }

  const lessons = studentLessons ? studentLessons : [];

  const myTeacher: JSX.Element[] = [];

  student?.my_teachers?.forEach((teacherId: string) => {
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

  const avatarUrl = getAvatarUrl(student?.avatar_url);

  return (
    <>
      <section className="grid grid-cols-[70%_30%] w-full bg-jade px-10 py-6 mb-8 [&_p]:text-lg">
        <div className="flex flex-col gap-3">
          <h2>Hi👋, {capitalizeAllFirst(student?.full_name)}</h2>
          {myTeacher.length > 0 ? (
            <div>
              <p>Let's start learning, please, choose your teacher</p>
              <p>My teachers:</p>
              <ul className="mt-2">{myTeacher}</ul>
            </div>
          ) : (
            <p>
              No teachers were found, please report the issue to{" "}
              <a href={`mailto:${support}`} className="text-blue-500 underline">
                support
              </a>
            </p>
          )}
          {isTeacher && (
            <div>
              <a href={`teacher/${toParamStr(student?.full_name)}`}>
                <button className="hover:text-amber-100">
                  go to your dashboard
                </button>
              </a>
            </div>
          )}
        </div>
        <aside className="flex flex-col items-center gap-2 [&_h3]:text-center">
          <div>
            <h3>My profile</h3>
            <div onClick={() => dialogFormRef?.current?.showModal()}>
              <AvatarPlaceholder
                name={student?.full_name || ""}
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

          {/* <h3>Home tasks</h3>
            <p>There are no home tasks for now. You are all up to date!</p> */}
        </aside>
      </section>
      <section>
        {lessons.length > 0 && (
          <>
            <h2>Your booked lessons:</h2>
            {lessons?.map((lesson, i) => (
              <MyLessons key={i} lessons={lesson} />
            ))}
          </>
        )}
      </section>

      <EditPersonalInfo dialogFormRef={dialogFormRef} />
    </>
  );
}

import type { MyTeacher } from "../../../types/profile";
import { getAvatarUrl } from "../../avatars/features/useAvatar";
import MyTeachers from "./MyTeachers";

export default function TeacherList({
  myTeachers,
}: {
  myTeachers: MyTeacher[] | undefined;
}) {
  // This is a support email in case of critical app error of no teachers found. To be changed with real support email.
  const support = "oljasmedetbaev@gmail.com";
  return (
    <>
      {myTeachers !== undefined && myTeachers.length > 0 ? (
        <div>
          <p>Let's start learning, please, choose your teacher</p>
          <p>My teachers:</p>
          <ul className="mt-2">
            {myTeachers.map((teacher) => {
              return (
                <MyTeachers
                  avatarUrl={getAvatarUrl(teacher.avatar)}
                  teacherName={teacher.name}
                  subject="English"
                />
              );
            })}
          </ul>
        </div>
      ) : (
        <p>
          No teachers were found, please reload this page. If it doesn't help
          report the issue to{" "}
          <a href={`mailto:${support}`} className="text-blue-500 underline">
            support
          </a>
        </p>
      )}
    </>
  );
}

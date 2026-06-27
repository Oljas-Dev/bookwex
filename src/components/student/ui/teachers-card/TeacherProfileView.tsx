import { toParamStr } from "../../../../helpers/features";
import type { MyTeacher } from "../../../../types/profile";
import { getAvatarUrl } from "../../../avatars/features/useAvatar";
import MyTeachers from "../MyTeachers";

export default function TeacherProfileView({
  myTeachers,
  teacherName,
}: {
  myTeachers: MyTeacher[] | undefined;
  teacherName: string | undefined;
}) {
  const teachersExist = myTeachers !== undefined && myTeachers.length > 0;

  return (
    <div
      className={`${teachersExist ? "justify-around" : "justify-end"} flex flex-col gap-2  h-full`}
    >
      {teachersExist &&
        myTeachers.map((teacher: MyTeacher) => {
          return (
            <MyTeachers
              avatarUrl={getAvatarUrl(teacher.avatar)}
              teacherName={teacher.name}
              subject="English"
              key={teacher.id}
            />
          );
        })}
      <button className="hover:text-amber-100">
        <a href={`teacher/${toParamStr(teacherName)}`}>go to your dashboard</a>
      </button>
    </div>
  );
}

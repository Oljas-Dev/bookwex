import { Link } from "react-router-dom";
import { toParamStr } from "../../../../helpers/features";
import type { MyTeacher } from "../../../../types/profile";
import { getAvatarUrl } from "../../../avatars/features/useAvatar";
import MyTeachers from "../MyTeachers";
import toast from "react-hot-toast";
import { Copy } from "react-bootstrap-icons";
import { useAuth } from "../../../../contexts/useAuth";

export default function TeacherProfileView({
  myTeachers,
  teacherName,
}: {
  myTeachers: MyTeacher[] | undefined;
  teacherName: string | undefined;
}) {
  const { isAdmin } = useAuth();
  const teachersExist = myTeachers !== undefined && myTeachers.length > 0;

  const teacherLink = `${window.location.origin}/teacher/${teacherName}`;

  async function copyTeacherLink() {
    try {
      await navigator.clipboard.writeText(teacherLink);
      // Show success toast
      toast.success("Link copied!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy link");
    }
  }

  return (
    <div
      className={`${teachersExist ? "justify-around" : "justify-end"} flex flex-col gap-4  h-full`}
    >
      {teachersExist &&
        myTeachers.map((teacher: MyTeacher) => {
          return (
            <div className="flex flex-col gap-2" key={teacher.id}>
              <h3>Your teachers:</h3>
              <MyTeachers
                avatarUrl={getAvatarUrl(teacher.avatar)}
                teacherName={teacher.name}
                subject="English"
              />
            </div>
          );
        })}
      <div className="flex flex-col gap-4">
        <Link to={`/teacher/${toParamStr(teacherName)}`}>
          <button className="hover:text-amber-100">go to your dashboard</button>
        </Link>
        {isAdmin && (
          <Link to={"/admin"}>
            <button className="hover:text-amber-100">admin dashboard</button>
          </Link>
        )}
        <div className="flex flex-col gap-2 relative">
          <label>send this link to your students</label>
          <input
            readOnly
            value={teacherLink}
            className="flex-1 px-4 py-2 rounded "
          />

          <button
            onClick={copyTeacherLink}
            className="bg-jade border-none p-1 absolute right-0.5 top-8.5"
          >
            <Copy />
          </button>
        </div>
      </div>
    </div>
  );
}

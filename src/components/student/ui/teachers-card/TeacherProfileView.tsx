import { Link } from "react-router-dom";
import { toParamStr } from "../../../../helpers/features";
import type { MyTeacher } from "../../../../types/profile";
import { getAvatarUrl } from "../../../avatars/features/useAvatar";
import MyTeachers from "../MyTeachers";
import toast from "react-hot-toast";
import { Copy } from "react-bootstrap-icons";
import { useAuth } from "../../../../contexts/useAuth";
import Button from "../../../../ui/Button";
import { useEffect } from "react";

export default function TeacherProfileView({
  myTeachers,
  teacherName,
}: {
  myTeachers: MyTeacher[] | undefined;
  teacherName: string | undefined;
}) {
  const { isAdmin } = useAuth();
  const teachersExist = myTeachers !== undefined && myTeachers.length > 0;

  const teacherLink = `${window.location.origin}/teacher/${toParamStr(teacherName)}`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connected = params.get("connected");
    if (connected === "true") {
      toast.success("Google Calendar connected");
    }

    window.history.replaceState({}, "", window.location.pathname);
  }, []);

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
      {teachersExist && (
        <>
          <h3>Your teachers:</h3>
          <ul className="flex flex-col gap-2">
            {myTeachers.map((teacher: MyTeacher) => {
              return (
                <MyTeachers
                  avatarUrl={getAvatarUrl(teacher.avatar)}
                  teacherName={teacher.name}
                  subject="English"
                  key={teacher.id}
                />
              );
            })}
          </ul>
        </>
      )}
      <div className="flex flex-col gap-4">
        <Link to={`/teacher/${toParamStr(teacherName)}`}>
          <Button>go to your dashboard</Button>
        </Link>

        {isAdmin && (
          <Link to={"/admin"}>
            <Button>admin dashboard</Button>
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

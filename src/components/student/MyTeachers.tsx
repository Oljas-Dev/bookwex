import { Link } from "react-router-dom";

import { capitalizeFirst, toParamStr } from "../../helpers/features";
import { AvatarPlaceholder } from "../avatars/features/AvatarPlaceholder";

type MyTeachersProps = {
  teacherName?: string;
  subject?: string;
  avatarUrl: string | null;
};

export default function MyTeachers({
  teacherName,
  subject,
  avatarUrl,
}: MyTeachersProps) {
  const divideFullName = teacherName?.split(" ") ?? [];

  const firstName = divideFullName[0] ? capitalizeFirst(divideFullName[0]) : "";

  const lastName = divideFullName[1] ? capitalizeFirst(divideFullName[1]) : "";

  const formattedName = `${firstName} ${lastName}`.trim();

  return (
    <li className="flex justify-between items-center border-t border-jet py-2 pr-2 last:border-b">
      <Link
        to={`/teacher/${toParamStr(teacherName ?? "")}`}
        className="flex items-center gap-2 text-lg hover:text-amber-100"
      >
        <AvatarPlaceholder
          name={formattedName}
          avatarUrl={avatarUrl}
          styles="w-12 h-12"
        />

        {formattedName || "Unknown teacher"}
      </Link>

      <p>teaching you: {subject ?? "Unknown subject"}</p>
    </li>
  );
}

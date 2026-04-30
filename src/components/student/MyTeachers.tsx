import { Link } from "react-router-dom";

import avatar from "../../assets/avatar.png";
import { capitalizeFirst, toParamStr } from "../../helpers/features";

export default function MyTeachers({
  teacherName,
  subject,
}: {
  teacherName: string;
  subject: string;
}) {
  const divideFullName = teacherName.split(" ");

  const firstName = capitalizeFirst(divideFullName[0]);
  const lastName = capitalizeFirst(divideFullName[1]);

  const formattedName = firstName + " " + lastName;

  return (
    <li className="flex justify-between items-center border-t border-b border-jet py-2 pr-2">
      <Link
        to={`/teacher/${toParamStr(teacherName)}`}
        className="flex items-center gap-2 text-lg"
      >
        <img
          src={avatar}
          className="w-12 h-12 object-cover rounded-full border-2 border-peach"
        />
        {formattedName}
      </Link>
      <p>teaching you: {subject}</p>
    </li>
  );
}

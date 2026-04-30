import { useParams } from "react-router-dom";
import { capitalizeAllFirst, toNormalStr } from "../../helpers/features";

export default function Chats() {
  const { teacherName } = useParams();

  const username = toNormalStr(teacherName);

  const formattedName = capitalizeAllFirst(username);

  return <div>Chat with {formattedName}</div>;
}

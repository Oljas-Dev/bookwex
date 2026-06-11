import { capitalizeAllFirst } from "../../helpers/features";
import Stars from "./ui/Stars";

export default function Header({
  teachersName,
}: {
  teachersName: string | undefined;
}) {
  const fullName = capitalizeAllFirst(teachersName) || "Guest";

  return (
    <div>
      <div className="flex items-center gap-8">
        <h1>{fullName}</h1>
        <Stars />
      </div>
      <p className="font-semibold">teacher</p>
    </div>
  );
}

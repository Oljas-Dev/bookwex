import type { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

export default function NoUserError({
  setCurrentTeacherId,
  teacherId,
}: {
  setCurrentTeacherId: Dispatch<SetStateAction<string>>;
  teacherId: string | undefined;
}) {
  if (!teacherId) return <p>teacher is not found</p>;
  return (
    <p>
      Please{" "}
      <Link
        to={`/auth/login?teacherId=${teacherId}`}
        className="text-blue-800"
        onClick={() => setCurrentTeacherId(teacherId)}
      >
        login
      </Link>{" "}
      or{" "}
      <Link
        to={`/auth/signup?teacherId=${teacherId}`}
        className="text-blue-800"
        onClick={() => setCurrentTeacherId(teacherId)}
      >
        sign up
      </Link>{" "}
      to continue with booking
    </p>
  );
}

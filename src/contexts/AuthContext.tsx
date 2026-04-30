import { type ReactNode } from "react";
import { UsersContext } from "./AuthContextData";
import useStudent from "../api/features/useStudent";
// import useProfile from "../api/features/useProfile";

export function AuthContext({ children }: { children: ReactNode }) {
  const { student, user } = useStudent();

  // User is authenticated
  const isAuthenticated = user?.role === "authenticated";

  // User logged in as a student
  // const isStudent = student?.id === user?.id && student?.role === "student";
  const isStudent = student?.role === "student";

  // User logged in as a teacher
  // const isTeacher = student?.id === user?.id && student?.role === "teacher";
  const isTeacher = student?.role === "teacher";

  // console.log(student);

  // console.log("student: ", isStudent, "teacher :", isTeacher);

  return (
    <UsersContext.Provider
      value={{
        isAuthenticated,
        isStudent,
        isTeacher,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

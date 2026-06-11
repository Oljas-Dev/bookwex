import { useContext } from "react";
import { TeacherDataContext } from "./TeacherDataTypes";

function useDashboard() {
  const context = useContext(TeacherDataContext);

  if (context === undefined)
    throw new Error("Context cannot be used outside the Provider");

  return context;
}

export { useDashboard };

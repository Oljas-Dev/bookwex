import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateSubjects as updateTeacherSubjects } from "../api/teacherDataApi";
import type { Subjects } from "../../Subjects";

export function useUpdateSubjects() {
  const navigate = useNavigate();

  const { mutate: updateSubjects, isPending } = useMutation({
    mutationFn: ({
      teacherId,
      subjects,
    }: {
      teacherId: string | undefined;
      subjects: Subjects[];
    }) => updateTeacherSubjects(teacherId, subjects),

    onSuccess: () => {
      navigate("/description");
    },
  });

  return { updateSubjects, isPending };
}

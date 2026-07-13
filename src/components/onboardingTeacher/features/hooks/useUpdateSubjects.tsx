import { useMutation } from "@tanstack/react-query";
import { updateSubjects as updateTeacherSubjects } from "../api/teacherDataApi";
import type { Subjects } from "../../Subjects";

export function useUpdateSubjects(onSuccessCallback?: () => void) {
  const { mutate: updateSubjects, isPending } = useMutation({
    mutationFn: ({
      teacherId,
      subjects,
    }: {
      teacherId: string | undefined;
      subjects: Subjects[];
    }) => updateTeacherSubjects(teacherId, subjects),

    onSuccess: () => {
      onSuccessCallback?.();
    },
  });

  return { updateSubjects, isPending };
}

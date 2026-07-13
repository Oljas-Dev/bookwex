import { useMutation } from "@tanstack/react-query";
import { updateStartYear } from "../api/teacherDataApi";

export function useUpdateYear(onSuccessCallback?: () => void) {
  const { mutate: updateYear, isPending } = useMutation({
    mutationFn: ({
      teacherId,
      startYear,
    }: {
      teacherId: string | undefined;
      startYear: string;
    }) => updateStartYear(teacherId, startYear),

    onSuccess: () => {
      onSuccessCallback?.();
    },
  });

  return { updateYear, isPending };
}

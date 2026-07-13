import { useMutation } from "@tanstack/react-query";
import { updateLanguages as updateLanguagesSpoken } from "../api/teacherDataApi";
import type { Languages } from "../../TeacherLanguages";
import toast from "react-hot-toast";

export function useUpdateLanguages(onSuccessCallback?: () => void) {
  const { mutate: updateLanguage, isPending } = useMutation({
    mutationFn: ({
      teacherId,
      languages,
    }: {
      teacherId: string | undefined;
      languages: Languages[];
    }) => updateLanguagesSpoken(teacherId, languages),

    onSuccess: () => {
      onSuccessCallback?.();
    },

    onError: (err) => {
      toast(err.message);
    },
  });

  return { updateLanguage, isPending };
}

import { useMutation } from "@tanstack/react-query";
import { updateLanguages as updateLanguagesSpoken } from "../api/teacherDataApi";
import { useNavigate } from "react-router-dom";
import type { Languages } from "../../TeacherLanguages";

export function useUpdateLanguages() {
  const navigate = useNavigate();

  const { mutate: updateLanguage, isPending } = useMutation({
    mutationFn: ({
      teacherId,
      languages,
    }: {
      teacherId: string | undefined;
      languages: Languages[];
    }) => updateLanguagesSpoken(teacherId, languages),

    onSuccess: () => {
      navigate("/subject");
    },
  });

  return { updateLanguage, isPending };
}

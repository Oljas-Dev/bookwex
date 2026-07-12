import { useMutation } from "@tanstack/react-query";
import { updateStartYear } from "../api/teacherDataApi";
import { useNavigate } from "react-router-dom";

export function useUpdateYear() {
  const navigate = useNavigate();

  const { mutate: updateYear, isPending } = useMutation({
    mutationFn: ({
      teacherId,
      startYear,
    }: {
      teacherId: string | undefined;
      startYear: string;
    }) => updateStartYear(teacherId, startYear),

    onSuccess: () => {
      navigate("/update-languages");
    },
  });

  return { updateYear, isPending };
}

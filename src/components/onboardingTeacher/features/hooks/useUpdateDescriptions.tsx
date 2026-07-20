import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateDescriptions } from "../api/teacherDataApi";
import type { OnboardingDescription } from "../../Description";

export function useUpdateDescriptions() {
  const navigate = useNavigate();

  const { mutate: updateDescription, isPending } = useMutation({
    mutationFn: ({
      teacherId,
      descriptions,
    }: {
      teacherId: string | undefined;
      descriptions: OnboardingDescription;
    }) => updateDescriptions(teacherId, descriptions),

    onSuccess: () => {
      navigate("/onboarding/video");
    },
  });

  return { updateDescription, isPending };
}

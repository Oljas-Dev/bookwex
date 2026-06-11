import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { HeroSectionFormData } from "../../../../types/ui";
import { updateHeroSection } from "../api/apiTeacherProfile";

export function useUpdateHeroSection() {
  const queryClient = useQueryClient();

  const { mutate: updateHero, isPending } = useMutation({
    mutationFn: ({
      teacherId,
      formData,
    }: {
      teacherId: string | undefined;
      formData: HeroSectionFormData;
    }) => updateHeroSection(teacherId, formData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["teacher-profile"],
      });

      toast.success("Profile updated successfully");
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return {
    updateHero,
    isPending,
  };
}

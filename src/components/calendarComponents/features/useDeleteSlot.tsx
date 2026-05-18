import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../api/supabase/supabase";
import toast from "react-hot-toast";

export function useDeleteSlot() {
  const queryClient = useQueryClient();

  const { mutate: deleteSlot, isPending } = useMutation({
    mutationKey: ["slots"],
    mutationFn: async ({
      userId,
      slotId,
    }: {
      userId: string | undefined;
      slotId: string | undefined;
    }) => {
      const { data, error } = await supabase
        .from("slots")
        .delete()
        .eq("id", slotId)
        .eq("user_id", userId)
        .select();

      if (error) {
        console.error(error.message);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slots"] });
      toast.success("Lesson was deleted");
    },
  });

  return { deleteSlot, isPending };
}

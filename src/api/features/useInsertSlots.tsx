import { useMutation, useQueryClient } from "@tanstack/react-query";
import insertSlots from "../CRUD/insertSlots";
import toast from "react-hot-toast";

export default function useInsertlots() {
  const queryClient = useQueryClient();

  const { mutate: insert, isPending: isInserting } = useMutation({
    mutationFn: insertSlots,
    onSuccess: () => {
      toast.success("Slots were successfully updated");
      queryClient.invalidateQueries({ queryKey: ["slots"] });
    },
    onError: (err) => alert(err.message),
  });
  return { insert, isInserting };
}

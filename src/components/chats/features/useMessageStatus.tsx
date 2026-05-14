import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../api/supabase/supabase";

export function useMessageStatus() {
  //   const queryClient = useQueryClient();

  const { data: msgStatus, isPending } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("messages").select("*");

      if (error) {
        console.error(error.message);
        throw error;
      }

      return data;
    },
  });

  return { msgStatus, isPending };
}

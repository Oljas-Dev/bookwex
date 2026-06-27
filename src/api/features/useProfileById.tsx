// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "../supabase/supabase";

// export function useProfileById(userId?: string) {
//   // if (!userId) return;
//   const { data: teacher, isPending } = useQuery({
//     queryKey: ["profiles", userId],
//     enabled: !!userId,

//     queryFn: async () => {
//       if (!userId) return null;

//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", userId)
//         .eq("role", "teacher")
//         .single();

//       if (error) {
//         console.error(error);
//         throw error;
//       }

//       return data;
//     },
//   });

//   return { teacher, isPending };
// }

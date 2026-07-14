// import { useQuery } from "@tanstack/react-query";
// import { getProfile } from "../CRUD/apiProfile";
// import { useParams } from "react-router-dom";
// import { toNormalStr } from "../../helpers/features";

// export default function useProfile() {
//   const { teacherName } = useParams();
//   const full_name = toNormalStr(teacherName);

//   const { data: profile, isPending } = useQuery({
//     queryFn: () => getProfile({ full_name }),
//     queryKey: ["profiles", full_name],
//     staleTime: 1000 * 60 * 5,
//   });
//   return { profile, isPending };
// }

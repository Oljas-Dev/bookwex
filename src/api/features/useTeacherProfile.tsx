import { useQuery } from "@tanstack/react-query";
import { getTeacherProfile } from "../CRUD/apiGetTeacherProfile";
import { mapTeacherProfile } from "../../mappers/mapTeacherProfile";

export function useTeacherProfile(teacherId?: string) {
  return useQuery({
    queryKey: ["teacher-profile", teacherId],

    enabled: !!teacherId,

    queryFn: async () => {
      const raw = await getTeacherProfile(teacherId!);

      return mapTeacherProfile(raw);
    },
  });
}

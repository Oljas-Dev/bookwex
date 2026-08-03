import TeacherCard from "./TeacherCard";
import { getAvatarUrl } from "../../avatars/features/useAvatar";
import type { ProfileType } from "../../../contexts/AuthContextData";
import dayjs from "dayjs";

export default function TeacherList({
  teachers,
}: {
  teachers: ProfileType[] | undefined;
}) {
  return (
    <ul className="flex flex-wrap justify-center items-center gap-4 mt-5">
      {teachers?.map((teacher) => {
        const avatar = getAvatarUrl(teacher.avatar_url);
        const startDate = dayjs(teacher.created_at).format("DD.MM.YYYY");

        return (
          <TeacherCard
            avatar={avatar}
            fullname={teacher.full_name}
            startDate={startDate}
            key={teacher.id}
          />
        );
      })}
    </ul>
  );
}

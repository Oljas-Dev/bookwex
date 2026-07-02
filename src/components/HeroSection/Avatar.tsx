import { AvatarPlaceholder } from "../avatars/features/AvatarPlaceholder";
import { capitalizeAllFirst } from "../../helpers/features";
import { getAvatarUrl } from "../avatars/features/useAvatar";
import type { TeacherProfile } from "../../types/ui";
import SocialLinks from "./ui/SocialLinks";
import Header from "./Header";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Avatar({
  teacherData,
}: {
  teacherData: TeacherProfile | undefined;
}) {
  const fullName = capitalizeAllFirst(teacherData?.full_name);

  const avatarUrl = getAvatarUrl(teacherData?.avatar_url);

  const tablet = useMediaQuery("(min-width:900px)");

  return (
    <div className="max-[900px]:flex max-[900px]:flex-col max-[900px]:items-center">
      <Header
        teachersName={teacherData?.full_name}
        rating={teacherData?.rating_calc}
        hidden={tablet}
      />
      <div className="flex flex-col items-end">
        <p className="text-5xl font-bold text-center text-jade-light -my-3 px-3 max-[900px]:hidden">
          {teacherData?.subject} <br /> teacher
        </p>
        <div className="flex-center bg-peach w-50 h-50 p-3 rounded-2xl shadow-[3px_3px_3px_var(--shadow-dark-card),-3px_-3px_3px_var(--shadow-light)] border-t-2 border-l-2 border-t-stroke-light border-l-stroke-light">
          <AvatarPlaceholder
            name={fullName || ""}
            avatarUrl={avatarUrl || undefined}
            styles="w-44 h-44 text-5xl"
          />
        </div>
        <div className="flex gap-3 mt-2 max-[900px]:hidden">
          <SocialLinks links={teacherData?.socialLinks} />
        </div>
      </div>
    </div>
  );
}

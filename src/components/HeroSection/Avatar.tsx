import instaIcon from "../../assets/instagram.svg";
import facebook from "../../assets/facebook.svg";
import x from "../../assets/twitter.svg";
import youtube from "../../assets/youtube.svg";

import SocialNetsCard from "./ui/SocialNetsCard";
import { AvatarPlaceholder } from "../avatars/features/AvatarPlaceholder";
import { useParams } from "react-router-dom";
import { capitalizeFirst } from "../../helpers/features";
import { getAvatarUrl } from "../avatars/features/useAvatar";
import useProfile from "../../api/features/useProfile";

export default function Avatar() {
  const { profile } = useProfile();
  const { teacherName } = useParams();

  const divideFullName = teacherName?.split("-") || "User";

  const firstName = capitalizeFirst(divideFullName[0]);
  const lastName = capitalizeFirst(divideFullName[1]);

  const formattedName = firstName + " " + lastName;

  const avatarUrl = getAvatarUrl(profile?.avatar_url);

  return (
    <div className="flex flex-col items-end">
      <p className="text-5xl font-bold text-center text-jade-light -my-3 px-3">
        english <br /> teacher
      </p>
      <div className="flex-center bg-peach w-50 h-50 p-3 rounded-2xl shadow-[3px_3px_3px_var(--shadow-dark-card),-3px_-3px_3px_var(--shadow-light)] border-t-2 border-l-2 border-t-stroke-light border-l-stroke-light">
        <AvatarPlaceholder
          name={formattedName || ""}
          avatarUrl={avatarUrl || null}
          styles="w-44 h-44 text-5xl"
        />
      </div>
      <div className="flex gap-3 mt-2">
        <SocialNetsCard icon={instaIcon} alt="instagram" />
        <SocialNetsCard icon={facebook} alt="instagram" />
        <SocialNetsCard icon={x} alt="instagram" />
        <SocialNetsCard icon={youtube} alt="instagram" />
      </div>
    </div>
  );
}

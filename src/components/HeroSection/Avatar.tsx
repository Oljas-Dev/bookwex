import avatar from "../../assets/avatar.png";
import instaIcon from "../../assets/instagram.svg";
import facebook from "../../assets/facebook.svg";
import x from "../../assets/twitter.svg";
import youtube from "../../assets/youtube.svg";

import SocialNetsCard from "./ui/SocialNetsCard";

export default function Avatar() {
  return (
    <div className="flex flex-col items-end">
      <p className="text-5xl font-bold text-center text-jade-light -my-3 px-3">
        english <br /> teacher
      </p>
      <div className="flex-center bg-peach w-50 h-50 p-3 rounded-2xl shadow-[3px_3px_3px_var(--shadow-dark-card),-3px_-3px_3px_var(--shadow-light)] border-t-2 border-l-2 border-t-stroke-light border-l-stroke-light">
        <img
          src={avatar}
          alt="Teacher Avatar"
          className="w-44 h-44 object-cover rounded-xl"
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

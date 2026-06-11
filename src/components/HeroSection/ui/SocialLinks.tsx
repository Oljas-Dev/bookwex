import type { TeacherSocialLink } from "../../../types/ui";
import instaIcon from "./../../../assets/instagram.svg";
import facebook from "./../../../assets/facebook.svg";
import x from "./../../../assets/twitter.svg";
import youtube from "./../../../assets/youtube.svg";
import SocialNetsCard from "./SocialNetsCard";

export default function SocialLinks({
  links,
}: {
  links: TeacherSocialLink[] | undefined;
}) {
  const socialLinksRendered = links?.map((link, i) => {
    const icon =
      (link.platform === "instagram" && instaIcon) ||
      (link.platform === "facebook" && facebook) ||
      (link.platform === "x" && x) ||
      (link.platform === "youtube" && youtube) ||
      undefined;

    return (
      <SocialNetsCard icon={icon} link={link.url} alt={link.platform} key={i} />
    );
  });
  return <div className="flex gap-3 mt-2">{socialLinksRendered}</div>;
}

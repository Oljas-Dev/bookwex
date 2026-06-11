// import instaIcon from "../../../assets/instagram.svg"

import { Link } from "react-router-dom";

export default function SocialNetsCard({
  icon,
  alt,
  link,
}: {
  icon: string | undefined;
  alt: string | undefined;
  link: string | undefined;
}) {
  const isDisabled = link === "#" ? true : false;

  return (
    <>
      {!isDisabled ? (
        <div className="flex-center items-center w-10 h-10 rounded bg-jade border-t-stroke-light border-l-stroke-light border-t border-l shadow-[3px_3px_3px_var(--shadow-dark-card)] hover:scale-110 active:scale-90">
          <Link to={link || "#"} target="_blank">
            <img src={icon} alt={alt} width={"25px"} />
          </Link>
        </div>
      ) : (
        <div className="flex-center items-center w-10 h-10 rounded bg-disabled-link cursor-default">
          <Link to="#">
            <img src={icon} alt={alt} width={"25px"} />
          </Link>
        </div>
      )}
    </>
  );
}

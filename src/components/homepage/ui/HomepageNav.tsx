import { DoorOpenFill, PersonFill } from "react-bootstrap-icons";
import { scrollToSection } from "../../../helpers/features";
import IconButton from "../../../ui/IconButton";
import { Link } from "react-router-dom";

export default function HomepageNav({
  isUser,
}: {
  isUser: boolean | undefined;
}) {
  return (
    <nav className="flex justify-between w-full pt-8 pb-3 pl-18 pr-6 max-[400px]:px-4 max-[400px]:py-5">
      <h2 className="text-3xl font-bold">Bookwex</h2>
      {isUser ? (
        <ul className="flex items-center gap-4">
          <Link to="/profile">
            <li className="flex items-center gap-1 hover:[&_p]:opacity-100">
              <p className="opacity-0">go to profile</p>{" "}
              <PersonFill size={24} />
            </li>
          </Link>

          <Link to="/auth/logout">
            <li className="flex items-center gap-2 hover:[&_p]:opacity-100">
              <p className="opacity-0">logout</p>
              <DoorOpenFill />
            </li>
          </Link>
        </ul>
      ) : (
        <div className="flex items-center gap-1">
          <IconButton
            fn={() => scrollToSection("foundingTutorSection")}
            styles={"text-lg"}
          >
            become a teacher
          </IconButton>
          <Link to={"/auth/login"}>login</Link>
          {/* <Link to={"/signup"}>signup</Link> */}
        </div>
      )}
    </nav>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { HouseDoorFill } from "react-bootstrap-icons";
import useStudent from "../../api/features/useStudent";
import useProfile from "../../api/features/useProfile";
import { toParamStr } from "../../helpers/features";

export default function Navigation() {
  const { profile } = useProfile();
  const { user } = useStudent();
  const isAuthenticated = user?.role === "authenticated";

  const navigate = useNavigate();
  const username = toParamStr(profile?.full_name);

  return (
    <nav className="grid grid-cols-[80%_20%] justify-items-center items-center w-full text-2xl my-6 px-4 cursor-pointer">
      <ul className="flex gap-5">
        <li>
          <Link to={"#"}>about</Link>
        </li>
        <li>
          <Link to={"#"}>reviews</Link>
        </li>
        <li>
          <Link to={"#"}>plans</Link>
        </li>
      </ul>
      <ul className="flex gap-5 text-xl">
        {isAuthenticated ? (
          <>
            <li onClick={() => navigate("/student")}>
              <HouseDoorFill />
            </li>
            <li>
              <Link to={`/teacher/${username}/logout`}>log out</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/login"}>login</Link>
            </li>
            <li>
              <Link to={"/signup"}>sign up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

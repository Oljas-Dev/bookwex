import { Link, useNavigate, useParams } from "react-router-dom";
import { Envelope, EnvelopeOpen, PersonFill } from "react-bootstrap-icons";
import { useMsgContext } from "../../contexts/useMsgContext";
import { useAuth } from "../../contexts/useAuth";

export default function Navigation() {
  const { user } = useAuth();
  const { teacherName } = useParams();
  const { hasUnreadMessages, isLoadingMsg } = useMsgContext();
  const isAuthenticated = user?.role === "authenticated";

  const navigate = useNavigate();

  if (isLoadingMsg) return <p>loading messages</p>;

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
      <ul className="flex gap-5 text-xl [&_li]:hover:scale-110 [&_li]active:scale-90">
        {isAuthenticated ? (
          <>
            <li onClick={() => navigate(`/teacher/${teacherName}/chat-room`)}>
              {hasUnreadMessages ? (
                <Envelope color="green" />
              ) : (
                <EnvelopeOpen />
              )}
            </li>
            <li onClick={() => navigate("/student")}>
              <PersonFill />
            </li>
            <li>
              <Link to={`/teacher/${teacherName}/logout`}>log out</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={`/login`}>login</Link>
            </li>
            <li>
              <Link to={`/teacher/${teacherName}/signup`}>sign up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

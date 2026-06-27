import { Link, useNavigate, useParams } from "react-router-dom";
import { Envelope, EnvelopeOpen, PersonFill } from "react-bootstrap-icons";
import { useAuth } from "../../contexts/useAuth";
import { useConversations } from "../chats/features/useConversations";
import { scrollToSection } from "../../helpers/features";

export default function Navigation({ teacherId }: { teacherId: string }) {
  const { user, setCurrentTeacherId } = useAuth();
  const { teacherName } = useParams();
  const { data: unreadMessages, isPending } = useConversations();
  const isAuthenticated = user?.role === "authenticated";

  const navigate = useNavigate();

  if (user && isPending) return <p>loading messages</p>;
  const hasUnreadMessages = unreadMessages?.some(
    (message) => message.unreadCount >= 1,
  );

  return (
    <nav className="grid grid-cols-[80%_20%] justify-items-center items-center w-full text-2xl my-6 px-4 cursor-pointer">
      <ul className="flex gap-5">
        <li onClick={() => scrollToSection("calendar")}>calendar</li>
        <li onClick={() => scrollToSection("reviewsSection")}>reviews</li>
        <li onClick={() => scrollToSection("myOfferSection")}>plans</li>
      </ul>
      <ul className="flex gap-5 text-xl [&_li]:hover:scale-110 [&_li]active:scale-90">
        {isAuthenticated ? (
          <>
            <li onClick={() => navigate(`/chat-room`)}>
              {hasUnreadMessages ? (
                <Envelope color="green" />
              ) : (
                <EnvelopeOpen />
              )}
            </li>
            <li onClick={() => navigate("/profile")}>
              <PersonFill />
            </li>
            <li>
              <Link to={`/teacher/${teacherName}/logout`}>log out</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to={`/login`}
                onClick={() => setCurrentTeacherId(teacherId)}
              >
                login
              </Link>
            </li>
            <li>
              <Link
                to={`/signup`}
                onClick={() => setCurrentTeacherId(teacherId)}
              >
                sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

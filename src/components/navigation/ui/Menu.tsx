import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/useAuth";
import { useConversations } from "../../chats/features/useConversations";
import {
  Envelope,
  EnvelopeOpen,
  PersonFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";
import { useState } from "react";
import { scrollToSection } from "../../../helpers/features";

export default function Menu({ teacherId }: { teacherId: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setCurrentTeacherId } = useAuth();
  const isAuthenticated = user?.role === "authenticated";
  const { data: unreadMessages, isPending } = useConversations();

  const navigate = useNavigate();

  if (user && isPending) return <p>loading messages</p>;
  const hasUnreadMessages = unreadMessages?.some(
    (message) => message.unreadCount >= 1,
  );

  return (
    <>
      <ul className="hidden min-[600px]:flex gap-5 text-xl [&_li]:hover:scale-110 [&_li]:active:scale-90">
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
              <Link to={`/auth/logout`}>log out</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to={"/auth/login"}
                onClick={() => setCurrentTeacherId(teacherId)}
              >
                login
              </Link>
            </li>
            <li>
              <Link
                to={"/auth/signup"}
                onClick={() => setCurrentTeacherId(teacherId)}
              >
                sign up
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className="relative min-[600px]:hidden">
        <button
          onClick={() => setIsMenuOpen((open) => !open)}
          className="p-2 bg-transparent border-none"
        >
          <ThreeDotsVertical size={24} />
        </button>

        {isMenuOpen && (
          <ul className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg border z-50 text-xl">
            {isAuthenticated ? (
              <>
                <li
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/chat-room")}
                >
                  Messages
                </li>

                <li
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </li>

                <li
                  className="p-3 hover:bg-gray-100 min-[500px]:hidden"
                  onClick={() => scrollToSection("calendar")}
                >
                  calendar
                </li>
                <li
                  className="p-3 hover:bg-gray-100 min-[500px]:hidden"
                  onClick={() => scrollToSection("reviewsSection")}
                >
                  reviews
                </li>
                <li
                  className="p-3 hover:bg-gray-100 min-[500px]:hidden"
                  onClick={() => scrollToSection("myOfferSection")}
                >
                  plans
                </li>

                <li className="p-3 hover:bg-gray-100">
                  <Link to={`/auth/logout`}>Log out</Link>
                </li>
              </>
            ) : (
              <>
                <li
                  className="p-3 hover:bg-gray-100 min-[500px]:hidden"
                  onClick={() => scrollToSection("calendar")}
                >
                  calendar
                </li>
                <li
                  className="p-3 hover:bg-gray-100 min-[500px]:hidden"
                  onClick={() => scrollToSection("reviewsSection")}
                >
                  reviews
                </li>
                <li
                  className="p-3 hover:bg-gray-100 min-[500px]:hidden"
                  onClick={() => scrollToSection("myOfferSection")}
                >
                  plans
                </li>

                <li className="p-3 hover:bg-gray-100">
                  <Link
                    to="/auth/login"
                    onClick={() => setCurrentTeacherId(teacherId)}
                  >
                    Login
                  </Link>
                </li>

                <li className="p-3 hover:bg-gray-100">
                  <Link
                    to="/auth/signup"
                    onClick={() => setCurrentTeacherId(teacherId)}
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </>
  );
}

import { useBecomeTeacher } from "../../../api/features/useBecomeTeacher";
import { useAuth } from "../../../contexts/useAuth";

export default function BecomeTeacher() {
  const { profile, isAuthenticated } = useAuth();
  const { activateTeacher } = useBecomeTeacher();
  return (
    <div className="flex flex-col gap-2 text-center justify-center  mx-auto px-10 h-screen max-[350px]:px-4">
      {isAuthenticated ? (
        <button onClick={() => activateTeacher(profile?.id)}>
          Become a teacher
        </button>
      ) : (
        <p>Please log in or sign up</p>
      )}
    </div>
  );
}

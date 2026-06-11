import { useBecomeTeacher } from "../../../api/features/useBecomeTeacher";
import { useAuth } from "../../../contexts/useAuth";

export default function BecomeTeacher() {
  const { profile, isAuthenticated } = useAuth();
  const { activateTeacher } = useBecomeTeacher();
  return (
    <>
      {isAuthenticated ? (
        <button onClick={() => activateTeacher(profile?.id)}>
          Become a teacher
        </button>
      ) : (
        <p>Please log in or sign up</p>
      )}
    </>
  );
}

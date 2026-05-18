import useLogout from "../../../api/features/useLogout";
import { useNavigate, useParams } from "react-router-dom";

export default function LogOut() {
  const { teacherName } = useParams();
  const { logout, isLoginout } = useLogout();

  const navigate = useNavigate();

  function handleSignOut() {
    logout({ teacherSlug: teacherName });
  }
  return (
    <div className="flex-center gap-2 text-center">
      <h2>Do you really want to sign out?</h2>
      <p>Please confirm your signing out</p>
      <div className="flex justify-between">
        <button onClick={() => navigate(-1)}>cancel</button>
        <button onClick={() => handleSignOut()} disabled={isLoginout}>
          sign out
        </button>
      </div>
    </div>
  );
}

import useLogout from "../../../api/features/useLogout";
import { useNavigate } from "react-router-dom";
import useProfile from "../../../api/features/useProfile";

export default function LogOut() {
  const { profile } = useProfile();
  const { logout, isLoginout } = useLogout();

  const navigate = useNavigate();

  function handleSignOut() {
    logout({ teacherSlug: profile?.full_name });
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

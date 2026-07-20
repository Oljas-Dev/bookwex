import useLogout from "../../../api/features/useLogout";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const { logout, isLoginout } = useLogout();

  const navigate = useNavigate();

  function handleSignOut() {
    logout();
  }
  return (
    <>
      <h2>Do you really want to sign out?</h2>
      <p>Please confirm your signing out</p>
      <div className="flex justify-between">
        <button onClick={() => navigate(-1)}>cancel</button>
        <button onClick={() => handleSignOut()} disabled={isLoginout}>
          sign out
        </button>
      </div>
    </>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdatePassword } from "../features/useUpdatePassword";

export default function ChangePasswordDialog() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const { changePassword, isChangingPassword } = useUpdatePassword();

  const navigate = useNavigate();

  function handleCancel() {
    navigate(-1);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!password) {
      setError("New password is required");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Passwords need to match. Please check your passwords fields.");
      return;
    }

    changePassword(password, {
      onSuccess: () => {
        navigate(-1);
      },
    });
  }
  return (
    <div
      className="
    fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/0 backdrop:backdrop-blur-xs open:backdrop:bg-black/50 transition-all rounded
  "
    >
      <div className="flex flex-col gap-3 px-4 pt-3 pb-6">
        <h2>Change your password</h2>
        <form onSubmit={handleSubmit} className="flex gap-2 min-w-75">
          <div className="flex flex-col gap-2 w-full">
            {/* <label htmlFor="oldPass">Old password confirmation:</label>
            <input
              id="oldPass"
              type="password"
              placeholder="enter your old password"
              className="rounded"
            /> */}

            <label htmlFor="newPass">New password:</label>
            <input
              id="newPass"
              type="password"
              placeholder="enter your new password"
              className="rounded"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="newPassConfirm">Password confirmation:</label>
            <input
              id="newPassConfirm"
              type="password"
              placeholder="confirm your new password"
              className="rounded"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />

            <button type="submit">
              {isChangingPassword ? "updating password..." : "change password"}
            </button>
            <button type="reset" onClick={handleCancel}>
              cancel
            </button>
          </div>
        </form>
        {error && <p className="text-red-600">{error}</p>}
        {/* <div className="flex flex-col items-center gap-2">
          <p>
            Forgot your{" "}
            <Link to={"/forgot-password"}>
              <strong>password</strong>
            </Link>
            ?{" "}
          </p>
        </div> */}
      </div>
    </div>
  );
}

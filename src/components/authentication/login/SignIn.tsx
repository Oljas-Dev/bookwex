import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../../api/features/useSingIn";
import toast from "react-hot-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const { login, isPending } = useLogin();
  const { login, isPending } = useLogin({
    onSuccess: () => {
      toast.success("Successfully logged in!");
      navigate("/profile");
    },
    onError: (message) => {
      setError(message);
    },
  });
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) return setError("Your email is required");
    if (!password) return setError("Please enter your password");

    login({ email, password });
  }

  return (
    <>
      <div className="text-center">Sign in to access the Tutor Web App</div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="emailInput">Enter your email</label>
            <input
              id="emailInput"
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="passwordInput">Enter your password</label>
            <input
              id="passwordInput"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
            />
          </div>
          <button
            type="submit"
            className="bg-jet-500 text-jade-500 hover:bg-jet-500/80 active:bg-jet-500"
            disabled={isPending}
          >
            {isPending ? "signing in" : "sign in"}
          </button>
        </form>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex flex-col items-center gap-2">
        <p>
          Forgot your{" "}
          <Link to={"/auth/forgot-password"}>
            <strong>password</strong>
          </Link>
          ?{" "}
        </p>
        <p>
          Don't have account yet?{" "}
          <Link to={`/auth/signup`}>
            <strong>Sign up</strong>
          </Link>
        </p>
      </div>
    </>
  );
}

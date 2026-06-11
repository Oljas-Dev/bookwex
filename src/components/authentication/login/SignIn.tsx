import { useState, type SubmitEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLogin } from "../../../api/features/useSingIn";
import { ArrowLeft } from "react-bootstrap-icons";
import toast from "react-hot-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { teacherName } = useParams();

  const { login, isPending } = useLogin();
  const navigate = useNavigate();

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) {
      setError("Your email is required");
    } else if (!password) {
      setError("Please enter your password");
    }
    login(
      { email, password },
      {
        onError: (error) => {
          setError(error.message);
          return;
        },
      },
    );

    toast.success("Successfully logged in!");

    // If current user is teacher then navigate to /teacher/${teacherName} and if student then to /student.

    navigate(`/profile`);
  }

  return (
    <div className="flex flex-col justify-center gap-6 mx-auto w-[50%] h-screen">
      <ArrowLeft
        style={{ alignSelf: "start", cursor: "pointer" }}
        onClick={() => navigate(-1)}
      />
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
              type="text"
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
          <Link to={"/forgot-password"}>
            <strong>password</strong>
          </Link>
          ?{" "}
        </p>
        <p>
          Don't have account yet?{" "}
          <Link to={`/teacher/${teacherName}/signup`}>
            <strong>Sign up</strong>
          </Link>
        </p>
      </div>
    </div>
  );
}

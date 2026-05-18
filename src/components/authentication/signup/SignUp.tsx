import { ArrowLeft } from "react-bootstrap-icons";
import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSignUp } from "../../../api/features/useSignUp";
import { toNormalStr } from "../../../helpers/features";

export default function SignUp() {
  const { teacherName } = useParams();
  const [email, setEmail] = useState("");
  const [full_name, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const { signup, isPending } = useSignUp();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!full_name) {
      setError("Your fullname is required");
      return;
    }
    if (!email) {
      setError("Your email is required");
      return;
    }
    if (!password) {
      setError("Your password is required");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Passwords need to match. Please check your passwords fields.");
      return;
    }
    const myTeachers = [
      {
        subject: "english",
        full_name: toNormalStr(teacherName),
      },
    ];

    signup({
      email,
      password,
      full_name,
      avatar_url: "",
      my_teachers: myTeachers,
    });
    navigate(`/teacher/${teacherName}`);
  }

  return (
    <div className="flex flex-col justify-center gap-6 mx-auto w-[50%] h-screen">
      <ArrowLeft
        style={{ alignSelf: "start", cursor: "pointer" }}
        onClick={() => navigate(-1)}
      />
      <div className="text-center">Sign up to become a student</div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="fullNameInput">Enter your name</label>
            <input
              id="fullNameInput"
              type="text"
              placeholder="firstname lastname"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="emailInput">Enter your email</label>
            <input
              id="emailInput"
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="passwordConfirmInput">Confirm your password</label>
            <input
              id="passwordConfirmInput"
              type="password"
              placeholder="password confirmation"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-jet-500 text-jade-500 hover:bg-jet-500/80 active:bg-jet-500"
            disabled={isPending}
          >
            {isPending ? "creating user" : "sign up"}
          </button>
        </form>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex flex-col items-center gap-2">
        <p>
          Already have account?{" "}
          <Link to={`/teacher/${teacherName}/login`}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

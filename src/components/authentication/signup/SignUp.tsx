import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSignUp } from "../../../api/features/useSignUp";
import { isNameAvailable } from "./isNameAvailable";
import { useEmailAvailability } from "./useEmailAvailability";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { emailRegex, passwordRegex } from "../../../helpers/variables";
// import { useVerificationEmail } from "../../../../emails/features/useVerificationEmail";

export default function SignUp() {
  const [searchParams] = useSearchParams();
  // const { mutate: verifyEmail } = useVerificationEmail();

  const navigate = useNavigate();
  const teacherId = searchParams.get("teacherId");

  const { signup, isPending } = useSignUp(() => {
    // verifyEmail({
    //   email,
    //   fullName: full_name,
    // });

    navigate("/auth/success-signup");
  });

  const [email, setEmail] = useState("");
  const [full_name, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const { isAvailable, isLoading } = useEmailAvailability(email);

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
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Your password is required");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, and a number",
      );
      return;
    }
    if (password !== passwordConfirm) {
      setError("Passwords need to match. Please check your passwords fields.");
      return;
    }

    if (!teacherId) {
      setError("Teacher not found");
      return;
    }

    // existing validations...
    const available = await isNameAvailable(full_name);

    if (!available) {
      setError("This name is already taken. Please choose another one.");
      return;
    }

    signup({
      email: email.trim(),
      password,
      full_name: full_name.toLowerCase(),
      avatar_url: "",
      my_teachers: [teacherId],
    });
  }

  return (
    <>
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

          {isLoading && <p>Checking email...</p>}

          {!isLoading && email && isAvailable === false && (
            <p className="text-red-600">Email is already taken</p>
          )}

          {!isLoading && email && isAvailable === true && (
            <p className="text-green-600">Email is available</p>
          )}
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
            <PasswordStrengthMeter password={password} />
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
          <Link to={`/auth/login?teacherId=${teacherId}`}>
            <strong>Sign in</strong>
          </Link>
        </p>
      </div>
    </>
  );
}

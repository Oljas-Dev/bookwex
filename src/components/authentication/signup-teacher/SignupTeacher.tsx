import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSignupTeacher } from "./features/useSignupTeacher";
import { isEmailAvailable, isNameAvailable } from "../signup/isNameAvailable";
import { emailRegex, passwordRegex } from "../../../helpers/variables";
import PasswordStrengthMeter from "../signup/PasswordStrengthMeter";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupTeacher() {
  const [searchParams] = useSearchParams();

  const isFoundingTutor = searchParams.get("program") === "founder";
  const navigate = useNavigate();

  const founderBtn = isFoundingTutor ? "become founder" : "become teacher";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate: signupTeacher, isPending } = useSignupTeacher();

  const password = watch("password", "");

  function onSubmit(data: FormValues) {
    const signUpData = {
      ...data,
      tutorType: isFoundingTutor ? "founder" : "standard",
    };

    signupTeacher(signUpData, {
      onSuccess() {
        navigate("/auth/success-signup");
      },
    });
  }

  return (
    <div className="max-w-md w-full flex flex-col gap-6 text-lg">
      <h1>
        {isFoundingTutor
          ? "Claim your Founder Tutor account"
          : "Create your teacher account"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("fullName", {
            required: "Name is required",

            validate: async (value) => {
              const available = await isNameAvailable(value);
              return available || "This name is already taken";
            },
          })}
          placeholder="Full name"
        />

        {errors.fullName && <span>{errors.fullName.message}</span>}

        <input
          {...register("email", {
            required: "Email is required",

            pattern: {
              value: emailRegex,
              message: "Please enter a valid email address",
            },

            validate: async (value) => {
              const available = await isEmailAvailable(value);
              return available || "This email is already registered";
            },
          })}
          placeholder="Email"
          type="email"
        />

        {errors.email && <span>{errors.email.message}</span>}

        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters",
            },

            pattern: {
              value: passwordRegex,
              message:
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
            },
          })}
          placeholder="Password"
          type="password"
        />
        <PasswordStrengthMeter password={password} />
        {errors.password && <span>{errors.password.message}</span>}

        <input
          {...register("confirmPassword", {
            required: "Please confirm your password",

            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
          })}
          placeholder="Confirm password"
          type="password"
        />

        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}

        <button disabled={isPending}>
          {isPending ? "Creating..." : founderBtn}
        </button>
      </form>
    </div>
  );
}

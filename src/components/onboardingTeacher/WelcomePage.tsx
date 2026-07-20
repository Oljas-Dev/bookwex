import { useForm } from "react-hook-form";
import { isValidYear } from "../../helpers/features";
import { useUpdateYear } from "./features/hooks/useUpdateYear";
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router-dom";

interface FormData {
  startYear: string;
}

export default function WelcomePage() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const { updateYear, isPending } = useUpdateYear(() => {
    navigate("/onboarding/update-languages");
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  function setYear(data: FormData) {
    updateYear({
      teacherId: user?.id,
      startYear: data.startYear,
    });
  }

  return (
    <>
      <div className="w-full bg-jade py-8 text-center ">
        <h2 className="font-bold text-3xl">Welcome to Bookwex👋</h2>
      </div>

      <form
        onSubmit={handleSubmit(setYear)}
        className="flex flex-col items-center gap-4 w-full max-[500px]:px-2 max-[500px]:text-center"
      >
        <p className="text-2xl">Let's get your teaching business online</p>

        <label>When did you start as a tutor</label>
        <input
          type="number"
          placeholder="set year"
          className={`rounded-lg border-2  ${errors.startYear ? "border-red-400" : "border-jade"} outline-none`}
          {...register("startYear", {
            required: {
              value: true,
              message: "This field is required",
            },
            validate: isValidYear,
          })}
        />
        {errors.startYear && (
          <p className="text-red-400">{errors?.startYear.message}</p>
        )}

        <button type="submit" disabled={!isValid || isPending}>
          {isPending ? "saving year..." : "next"}
        </button>
      </form>
    </>
  );
}

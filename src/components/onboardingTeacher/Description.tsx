import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { useUpdateDescriptions } from "./features/hooks/useUpdateDescriptions";

export interface OnboardingDescription {
  title: string;
  content: string;
}

export default function Description() {
  const { user } = useAuth();
  const { updateDescription, isPending } = useUpdateDescriptions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingDescription>();

  const navigate = useNavigate();

  function sendSubjects(data: OnboardingDescription) {
    updateDescription({
      teacherId: user?.id,
      descriptions: data,
    });
  }

  return (
    <>
      <div className="w-full bg-jade py-8 text-center ">
        <h2 className="font-bold text-3xl">Show Students Your Best 🌟</h2>
      </div>

      <form
        onSubmit={handleSubmit(sendSubjects)}
        className="flex flex-col items-center gap-4 w-full max-[500px]:px-2 max-[500px]:text-center"
      >
        <p className="text-2xl">Create motivational title and description</p>

        <div className="flex flex-col gap-2 w-[50%] max-[500px]:w-full">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title that stands out"
            {...register("title", {
              required: {
                value: true,
                message: "This field is required",
              },
              minLength: {
                value: 10,
                message: "There should be at least 10 symbols",
              },
              maxLength: {
                value: 80,
                message: "There cannot be more than 80 symbols",
              },
              validate: (value) =>
                value.trim().length >= 10 || "Title cannot be empty spaces",
            })}
            className={`rounded-lg border-2 p-2 outline-none ${
              errors.title ? "border-red-400" : "border-jade"
            }`}
          />

          {errors.title && (
            <p className="text-red-400">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-[50%] max-[500px]:w-full">
          <label htmlFor="content">Description</label>
          <textarea
            placeholder="Why should people study with you"
            {...register("content", {
              required: {
                value: true,
                message: "This field is required",
              },
              minLength: {
                value: 100,
                message: "There should be at least 100 symbols",
              },
              maxLength: {
                value: 1000,
                message: "There cannot be more than 1000 symbols",
              },
              validate: (value) =>
                value.trim().length >= 100 || "Title cannot be empty spaces",
            })}
            className={`rounded-lg border-2 p-2 text-sm min-h-50 outline-none ${
              errors.title ? "border-red-400" : "border-jade"
            }`}
          />

          {errors.content && (
            <p className="text-red-400">{errors.content.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button type="reset" onClick={() => navigate(-1)}>
            back
          </button>
          <button type="submit">
            {isPending ? "saving description..." : "next step"}
          </button>
        </div>
      </form>
    </>
  );
}

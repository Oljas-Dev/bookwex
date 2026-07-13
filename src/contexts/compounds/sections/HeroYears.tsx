import { useForm } from "react-hook-form";
import { useDashboard } from "../../useTeacherData";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateYear } from "../../../components/onboardingTeacher/features/hooks/useUpdateYear";
import { isValidYear } from "../../../helpers/features";

interface TeacherYears {
  startYear: string;
}

export default function HeroYears({
  id,
  startYear,
  teacherId,
}: {
  id: string;
  startYear: string;
  teacherId: string | undefined;
}) {
  const { closeDialog, dialogDashboard, active } = useDashboard();

  const queryClient = useQueryClient();

  const { updateYear, isPending } = useUpdateYear(() => {
    queryClient.invalidateQueries({ queryKey: ["teacher-profile"] });
    closeDialog(dialogDashboard);
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TeacherYears>();

  if (id !== active) return null;

  function setYear(data: TeacherYears) {
    updateYear({
      teacherId: teacherId,
      startYear: data.startYear,
    });
  }

  return (
    <div className="min-w-75 px-4 py-6 [&_input]:rounded max-[400px]:min-w-60 max-[400px]:px-2">
      <form onSubmit={handleSubmit(setYear)} className="flex flex-col gap-6">
        <h2 className="max-[400px]:text-2xl">Edit your years section</h2>

        <div className="flex flex-col gap-2">
          <label>When did you start as a tutor</label>
          <input
            type="number"
            defaultValue={startYear}
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
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="bg-jade hover:bg-jade-light"
            disabled={!isValid || isPending}
          >
            {isPending ? "saving year..." : "edit start year"}
          </button>

          <button type="button" onClick={() => closeDialog(dialogDashboard)}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}

import type {
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { XCircle } from "react-bootstrap-icons";
import type { TeacherSubjectsForm } from "../../../../components/onboardingTeacher/Subjects";
// import { Languages } from "../TeacherLanguages";

interface SubjectFormRowProps {
  register: UseFormRegister<TeacherSubjectsForm>;
  errors: FieldErrors<TeacherSubjectsForm>;
  row: number;
  remove: UseFieldArrayRemove;
  check: TeacherSubjectsForm["subjects"];
  setValue: UseFormSetValue<TeacherSubjectsForm>;
}

export default function EditSubjectRow({
  register,
  errors,
  row,
  remove,
  check,
  setValue,
}: SubjectFormRowProps) {
  return (
    <div className="flex items-center gap-4 relative max-[600px]:flex-col max-[600px]:gap-2">
      <div className="flex flex-col gap-2 w-full">
        <label>Subject</label>
        <input
          type="text"
          placeholder="subject"
          className={`rounded-lg border-2 p-2 ${
            errors.subjects?.[row]?.subject ? "border-red-400" : "border-jade"
          } outline-none`}
          {...register(`subjects.${row}.subject`, {
            required: "This field is required",
          })}
        />

        {errors.subjects?.[row]?.subject && (
          <p className="text-red-400">
            {errors.subjects[row]?.subject?.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label>Teaching Priority</label>

        <select
          {...register(`subjects.${row}.category`)}
          onChange={(e) => {
            if (e.target.value === "main") {
              check.forEach((_, index) => {
                setValue(
                  `subjects.${index}.category`,
                  index === row ? "main" : "secondary",
                );
              });
            }
          }}
          className="text-lg border-2 border-jade p-2 rounded-lg"
        >
          <option value="main">main</option>
          <option value="secondary">secondary</option>
        </select>
      </div>

      <button
        onClick={() => remove(row)}
        className="border-none bg-transparent p-1 absolute top-8.5 -right-7 max-[600px]:-right-7 max-[600px]:top-18"
      >
        <XCircle />
      </button>
    </div>
  );
}

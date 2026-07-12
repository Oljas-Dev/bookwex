import type {
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import type { TeacherSubjectsForm } from "../Subjects";
// import { Languages } from "../TeacherLanguages";

interface SubjectFormRowProps {
  register: UseFormRegister<TeacherSubjectsForm>;
  errors: FieldErrors<TeacherSubjectsForm>;
  row: number;
  remove: UseFieldArrayRemove;
}

export default function SubjectFormRow({
  register,
  errors,
  row,
  remove,
}: SubjectFormRowProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
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

      <div className="flex flex-col gap-2">
        <label>Teaching Priority</label>

        <select
          {...register(`subjects.${row}.category`)}
          className="text-lg border-2 border-jade p-2 rounded-lg"
        >
          <option value="main">main</option>
          <option value="secondary">secondary</option>
        </select>
      </div>

      <button onClick={() => remove(row)}>-</button>
    </div>
  );
}

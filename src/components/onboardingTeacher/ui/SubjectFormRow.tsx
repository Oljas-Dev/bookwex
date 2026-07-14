import type {
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import type { TeacherSubjectsForm } from "../Subjects";
import { XCircle } from "react-bootstrap-icons";
// import { Languages } from "../TeacherLanguages";

interface SubjectFormRowProps {
  register: UseFormRegister<TeacherSubjectsForm>;
  errors: FieldErrors<TeacherSubjectsForm>;
  row: number;
  remove: UseFieldArrayRemove;
  check: TeacherSubjectsForm["subjects"];
  setValue: UseFormSetValue<TeacherSubjectsForm>;
}

export default function SubjectFormRow({
  register,
  errors,
  row,
  remove,
  check,
  setValue,
}: SubjectFormRowProps) {
  function deleteRow() {
    if (row !== 0) {
      remove(row);
    } else return;
  }

  return (
    <div className="flex gap-4 relative max-[400px]:flex-col max-[400px]:border-b max-[400px]:border-jet max-[400px]:pb-5">
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
        onClick={deleteRow}
        className="border-none bg-transparent p-1 absolute top-8 -right-9 max-[400px]:top-19 max-[400px]:-right-12"
      >
        <XCircle />
      </button>
    </div>
  );
}

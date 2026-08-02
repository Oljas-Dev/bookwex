import type {
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import type { TeacherLanguagesForm } from "../../../../components/onboardingTeacher/TeacherLanguages";
import { XCircle } from "react-bootstrap-icons";
// import { Languages } from "../TeacherLanguages";

interface LanguageFormRowProps {
  register: UseFormRegister<TeacherLanguagesForm>;
  errors: FieldErrors<TeacherLanguagesForm>;
  row: number;
  remove: UseFieldArrayRemove;
}

export default function EditLanguageRow({
  register,
  errors,
  row,
  remove,
}: LanguageFormRowProps) {
  function deleteRow() {
    if (row !== 0) {
      remove(row);
    } else return;
  }

  return (
    <div className="flex items-center gap-4 relative max-[600px]:flex-col max-[600px]:gap-2">
      <div className="flex flex-col gap-2 w-full">
        <label>Language</label>
        <input
          type="text"
          placeholder="language"
          className={`rounded-lg border-2 p-2 ${
            errors.languages?.[row]?.language ? "border-red-400" : "border-jade"
          } outline-none`}
          {...register(`languages.${row}.language`, {
            required: "This field is required",
          })}
        />

        {errors.languages?.[row]?.language && (
          <p className="text-red-400">
            {errors.languages[row]?.language?.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label>Your level</label>

        <select
          {...register(`languages.${row}.level`)}
          className="text-lg border-2 border-jade p-2 rounded-lg"
        >
          <option value="native">native</option>
          <option value="fluent">fluent</option>
          <option value="intermediate">intermediate</option>
          <option value="beginner">beginner</option>
        </select>
      </div>

      <button
        onClick={deleteRow}
        className="border-none bg-transparent p-1 absolute top-8.5 -right-7 max-[600px]:-right-7 max-[600px]:top-18"
      >
        <XCircle />
      </button>
    </div>
  );
}

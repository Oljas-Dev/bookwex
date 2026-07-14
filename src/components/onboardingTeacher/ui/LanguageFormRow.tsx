import type {
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import type { TeacherLanguagesForm } from "../TeacherLanguages";
import { XCircle } from "react-bootstrap-icons";
// import { Languages } from "../TeacherLanguages";

interface LanguageFormRowProps {
  register: UseFormRegister<TeacherLanguagesForm>;
  errors: FieldErrors<TeacherLanguagesForm>;
  row: number;
  remove: UseFieldArrayRemove;
}

export default function LanguageFormRow({
  register,
  errors,
  row,
  remove,
}: LanguageFormRowProps) {
  return (
    <div className="flex gap-2 relative max-[400px]:flex-col max-[400px]:border-b max-[400px]:border-jet max-[400px]:pb-5">
      <div className="flex flex-col gap-2">
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

      <div className="flex flex-col gap-2">
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
        onClick={() => remove(row)}
        className="border-none bg-transparent p-1 absolute top-8 -right-9 max-[500px]:-right-8 max-[400px]:top-19 max-[400px]:-right-12"
      >
        <XCircle />
      </button>
    </div>
  );
}

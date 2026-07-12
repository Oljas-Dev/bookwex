import type {
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import type { TeacherLanguagesForm } from "../TeacherLanguages";
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
    <div className="flex gap-4">
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

      <button onClick={() => remove(row)}>-</button>
    </div>
  );
}

import type {
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import type { PackagesForm } from "../CreatePackage";
import Button from "../../../../ui/Button";

interface lessonTitleTypes {
  title: string;
}

interface PackagesInputs {
  lessonTitle: lessonTitleTypes | undefined | null;
  errors: FieldErrors<PackagesForm>;
  register: UseFormRegister<PackagesForm>;
  row: number;
  remove: UseFieldArrayRemove;
}

export default function PackagesForm({
  lessonTitle,
  errors,
  register,
  row,
  remove,
}: PackagesInputs) {
  const inputStyles = "border-2 rounded-lg px-4 py-2 outline-none";
  const packageErrors = errors.packages?.[row];

  function deleteRow() {
    if (row !== 0) {
      remove(row);
    } else return;
  }
  return (
    <>
      <h3>
        {lessonTitle?.title} package #{row + 1}
      </h3>
      <div className="flex flex-col gap-2 w-[50%]">
        <label htmlFor="lessons_count">
          How many lessons are you going to sell
        </label>
        <input
          type="number"
          placeholder="Amount of lessons"
          className={`${inputStyles} ${packageErrors?.lessons_count ? "border-red-200" : "border-secondary-bg"}`}
          {...register(`packages.${row}.lessons_count`, {
            valueAsNumber: true,
            required: {
              value: true,
              message: "This field is required",
            },
            min: {
              value: 1,
              message: "Lessons amount should be at least 1",
            },
            max: {
              value: 1000,
              message: "Lessons amount seems too high",
            },
          })}
        />
        {packageErrors?.lessons_count && (
          <p className="text-red-800">
            {packageErrors?.lessons_count?.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-[50%]">
        <label htmlFor="price">Price for your package</label>
        <input
          type="number"
          placeholder="Package price"
          className={`${inputStyles} ${packageErrors?.price ? "border-red-200" : "border-secondary-bg"}`}
          {...register(`packages.${row}.price`, {
            valueAsNumber: true,
            required: {
              value: true,
              message: "This field is required",
            },
            min: {
              value: 1,
              message: "Price must be at least 1",
            },
            max: {
              value: 1000,
              message: "Price seems too high",
            },
          })}
        />
        {packageErrors?.price && (
          <p className="text-red-800">{packageErrors?.price?.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-[50%]">
        <label htmlFor="description">Describe your package</label>
        <textarea
          {...register(`packages.${row}.description`, {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "Describe your package in at least 10 characters",
            },
            maxLength: {
              value: 250,
              message: "Description cannot exceed 250 characters",
            },
          })}
          placeholder="Describe your package"
          className={`${inputStyles} ${
            packageErrors?.description
              ? "border-red-200"
              : "border-secondary-bg"
          } text-sm min-h-40`}
        />
        {packageErrors?.description && (
          <p className="text-red-800">{packageErrors?.description?.message}</p>
        )}
      </div>
      {row > 0 && <Button fn={deleteRow}>delete package -</Button>}
    </>
  );
}

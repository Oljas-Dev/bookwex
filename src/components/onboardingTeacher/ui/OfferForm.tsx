import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TeacherOffersForm } from "../TeacherOffers";

interface OfferFormProps {
  register: UseFormRegister<TeacherOffersForm>;
  errors: FieldErrors<TeacherOffersForm>;
  index: number;
}

export default function OfferForm({ register, errors, index }: OfferFormProps) {
  return (
    <div className="flex flex-col gap-4 w-[50%] [&_label]:pl-2 max-[500px]:w-full">
      <h3>Your offer #{index + 1}</h3>

      <div className="flex flex-col gap-2 ">
        <label>Lesson format</label>
        <input
          {...register(`offers.${index}.title`, {
            required: "This field is required",
            minLength: {
              value: 5,
              message: "Title must be at least 5 characters",
            },
            maxLength: {
              value: 80,
              message: "Title cannot exceed 80 characters",
            },
          })}
          placeholder="trial, private, exam preparation..."
          className={`rounded-lg border-2 p-2 outline-none ${
            errors.offers?.[index]?.title ? "border-red-400" : "border-jade"
          }`}
        />
        {errors.offers?.[index]?.title && (
          <p className="text-red-400">{errors.offers[index]?.title?.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label>Lesson goal</label>
        <input
          {...register(`offers.${index}.goal`, {
            required: "This field is required",
            minLength: {
              value: 20,
              message: "Goal must be at least 20 characters",
            },
            maxLength: {
              value: 200,
              message: "Goal cannot exceed 200 characters",
            },
          })}
          placeholder="goal of your lesson"
          className={`rounded-lg border-2 p-2 outline-none ${
            errors.offers?.[index]?.goal ? "border-red-400" : "border-jade"
          }`}
        />
        {errors.offers?.[index]?.goal && (
          <p className="text-red-400">{errors.offers[index]?.goal?.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label>Your method</label>
        <input
          {...register(`offers.${index}.method`, {
            required: "This field is required",
            minLength: {
              value: 20,
              message: "Method must be at least 20 characters",
            },
            maxLength: {
              value: 300,
              message: "Method cannot exceed 300 characters",
            },
          })}
          placeholder="how will you achieve the goal"
          className={`rounded-lg border-2 p-2 outline-none ${
            errors.offers?.[index]?.method ? "border-red-400" : "border-jade"
          }`}
        />
        {errors.offers?.[index]?.method && (
          <p className="text-red-400">
            {errors.offers[index]?.method?.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label>Results</label>
        <input
          {...register(`offers.${index}.result`, {
            required: "This field is required",
            minLength: {
              value: 20,
              message: "Result must be at least 20 characters",
            },
            maxLength: {
              value: 250,
              message: "Result cannot exceed 250 characters",
            },
          })}
          placeholder="what results student can expect"
          className={`rounded-lg border-2 p-2 outline-none ${
            errors.offers?.[index]?.result ? "border-red-400" : "border-jade"
          }`}
        />
        {errors.offers?.[index]?.result && (
          <p className="text-red-400">
            {errors.offers[index]?.result?.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label>Price</label>
        <input
          type="number"
          {...register(`offers.${index}.price`, {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price must be at least 1",
            },
            max: {
              value: 1000,
              message: "Price seems too high",
            },
          })}
          placeholder="your price"
          className={`rounded-lg border-2 p-2 outline-none ${
            errors.offers?.[index]?.price ? "border-red-400" : "border-jade"
          }`}
        />
        {errors.offers?.[index]?.price && (
          <p className="text-red-400">{errors.offers[index]?.price?.message}</p>
        )}
      </div>
    </div>
  );
}

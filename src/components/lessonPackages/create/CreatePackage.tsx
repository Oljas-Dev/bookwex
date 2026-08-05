import { useForm } from "react-hook-form";
import PackagesHeader from "../ui/PackagesHeader";
import Button from "../../../ui/Button";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/useAuth";
import useGetLessonOffer from "./hook/useGetLessonOffer";

interface packageForm {
  lessons_count: number;
  price: number;
  description: string;
}

export default function CreatePackageForm() {
  const { profile } = useAuth();
  const { lessonTypeId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<packageForm>();

  const { lessonTitle } = useGetLessonOffer(lessonTypeId, profile?.id);

  const inputStyles = "border-2 rounded-lg px-4 py-2 outline-none";

  function submit(data: packageForm) {
    const newPackage = {
      lesson_id: lessonTypeId,
      teacher_id: profile?.id,
      name: lessonTitle?.title,
      description: data.description,
      lesson_count: Number(data.lessons_count),
      price: Number(data.price),
    };
    console.log(newPackage);

    reset();
  }
  return (
    <section className="w-full bg-jade px-10 py-6 mb-8 relative max-[900px]:flex max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-6">
      <PackagesHeader title="Create new package" />
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col justify-center items-center gap-4"
      >
        <h3>{lessonTitle?.title} package</h3>
        <div className="flex flex-col gap-2 w-[50%]">
          <label htmlFor="lessons_count">
            How many lessons are you going to sell
          </label>
          <input
            type="number"
            placeholder="Amount of lessons"
            className={`${inputStyles} ${errors.lessons_count?.message ? "border-red-200" : "border-secondary-bg"}`}
            {...register("lessons_count", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors.lessons_count?.message && (
            <p className="text-red-800">{errors.lessons_count?.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-[50%]">
          <label htmlFor="price">Price for your package</label>
          <input
            type="number"
            placeholder="Package price"
            className={`${inputStyles} ${errors.price?.message ? "border-red-200" : "border-secondary-bg"}`}
            {...register("price", {
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
          {errors.price?.message && (
            <p className="text-red-800">{errors.price?.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-[50%]">
          <label htmlFor="description">Describe your package</label>
          <textarea
            {...register("description", {
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
              errors.description?.message
                ? "border-red-200"
                : "border-secondary-bg"
            } text-sm min-h-40`}
          />
          {errors.description?.message && (
            <p className="text-red-800">{errors.description?.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button type="button">cancel</Button>
          <Button type="submit" borderColor="border-green-btn">
            create
          </Button>
        </div>
      </form>
    </section>
  );
}

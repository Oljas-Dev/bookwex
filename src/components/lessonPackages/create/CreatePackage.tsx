import { useForm, useFieldArray } from "react-hook-form";
import PackagesHeader from "../ui/PackagesHeader";
import Button from "../../../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/useAuth";
import useGetLessonOffer from "./hook/useGetLessonOffer";
import PackagesForm from "./ui/PackageForm";
import toast from "react-hot-toast";
import useCreateLessonPackages from "./hook/useCreateLessonPackages";
import SmallSpinner from "../../../ui/Spinner";

interface packageTypes {
  lessons_count: number;
  price: number;
  description: string;
}

export interface PackagesForm {
  packages: packageTypes[];
}

export default function CreatePackageForm() {
  const { profile } = useAuth();
  const { lessonTypeId } = useParams();
  const { createPackages, isPending } = useCreateLessonPackages();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    control,
  } = useForm<PackagesForm>({
    mode: "onChange",
    defaultValues: {
      packages: [
        {
          description: "",
          lessons_count: 0,
          price: 0,
        },
      ],
    },
  });

  const { lessonTitle } = useGetLessonOffer(lessonTypeId, profile?.id);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "packages",
  });

  const navigate = useNavigate();

  function submit(data: PackagesForm) {
    const packages = data.packages.map((pkg) => ({
      ...pkg,
      lesson_id: lessonTypeId,
      teacher_id: profile?.id,
      name: lessonTitle?.title ?? "",
    }));

    createPackages(packages);

    reset();
  }

  function addFormRow() {
    if (fields.length >= 3) {
      toast.error("You have reached maximum of packages");
      return;
    }

    append({
      description: "",
      lessons_count: 0,
      price: 0,
    });
  }
  return (
    <section className="w-full bg-jade px-10 py-6 mb-8 relative max-[900px]:flex max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-6">
      <PackagesHeader title="Create new package" />
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col justify-center items-center gap-4 px-4 py-2 border-2 border-secondary-bg rounded-xl"
      >
        {fields.map((field, i) => {
          return (
            <PackagesForm
              lessonTitle={lessonTitle}
              errors={errors}
              register={register}
              row={i}
              remove={remove}
              key={field.id}
            />
          );
        })}

        <Button type="button" disabled={!isValid} fn={addFormRow}>
          add package +
        </Button>
        <div className="flex justify-center gap-4 mt-8">
          <Button type="button" fn={() => navigate(-1)}>
            cancel
          </Button>
          <Button
            type="submit"
            borderColor="border-green-btn"
            disabled={isPending}
          >
            {isPending ? (
              <>
                creating <SmallSpinner />
              </>
            ) : (
              "create your package"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}

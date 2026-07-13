import { useFieldArray, useForm } from "react-hook-form";
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import SubjectFormRow from "./ui/SubjectFormRow";
import { useUpdateSubjects } from "./features/hooks/useUpdateSubjects";
import toast from "react-hot-toast";

export type SubjectType = "main" | "secondary";

export interface Subjects {
  subject: string;
  category: SubjectType;
}

export interface TeacherSubjectsForm {
  subjects: Subjects[];
}

export default function Subjects() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const { updateSubjects, isPending } = useUpdateSubjects(() => {
    navigate("/description");
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    control,
  } = useForm<TeacherSubjectsForm>({
    defaultValues: {
      subjects: [{ subject: "", category: "main" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  const subjectsCheck = watch("subjects");

  function sendSubjects(data: TeacherSubjectsForm) {
    const mainSubjects = data.subjects.filter(
      (subject) => subject.category === "main",
    );

    if (mainSubjects.length !== 1) {
      toast.error("Please select exactly one main subject.");
      return;
    }
    updateSubjects({
      teacherId: user?.id,
      subjects: data.subjects,
    });
  }

  function addFormRow() {
    if (fields.length >= 20) return;

    append({
      subject: "",
      category: "main",
    });
  }

  return (
    <section className="h-screen">
      <article className="text-jet flex flex-col items-center min-h-screen bg-secondary-bg w-280 pb-5">
        <form
          onSubmit={handleSubmit(sendSubjects)}
          className="flex flex-col items-center gap-4 w-full"
        >
          <div className="w-full bg-jade py-8 text-center ">
            <h2 className="font-bold text-3xl">Build Your Profile 🛠️</h2>
          </div>
          <p className="text-2xl">What subjects are you going to teach</p>

          {fields.map((field, i) => {
            return (
              <SubjectFormRow
                register={register}
                errors={errors}
                remove={remove}
                key={field.id}
                row={i}
                check={subjectsCheck}
                setValue={setValue}
              />
            );
          })}
          <button onClick={addFormRow}>add subject +</button>

          <div className="flex gap-4">
            <button type="reset" onClick={() => navigate(-1)}>
              back
            </button>
            <button type="submit" disabled={!isValid || isPending}>
              {isPending ? "saving subjects..." : "next step"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

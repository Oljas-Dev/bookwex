import { useFieldArray, useForm } from "react-hook-form";
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { useUpdateLanguages } from "./features/hooks/useUpdateLaguages";
import LanguageFormRow from "./ui/LanguageFormRow";

export type LanguageLevel = "native" | "fluent" | "intermediate" | "beginner";

export interface Languages {
  language: string;
  level: LanguageLevel;
}

export interface TeacherLanguagesForm {
  languages: Languages[];
}

export default function TeacherLanguages() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const { updateLanguage, isPending } = useUpdateLanguages(() => {
    navigate("/subject");
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<TeacherLanguagesForm>({
    defaultValues: {
      languages: [{ language: "", level: "native" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  function sendLanguages(data: TeacherLanguagesForm) {
    updateLanguage({
      teacherId: user?.id,
      languages: data.languages,
    });
  }

  function addFormRow() {
    if (fields.length >= 20) return;

    append({
      language: "",
      level: "native",
    });
  }

  return (
    <section className="h-screen">
      <article className="text-jet flex flex-col items-center min-h-screen bg-secondary-bg w-280 pb-5">
        <form
          onSubmit={handleSubmit(sendLanguages)}
          className="flex flex-col items-center gap-4 w-full"
        >
          <div className="w-full bg-jade py-8 text-center ">
            <h2 className="font-bold text-3xl">One Step Closer ✨</h2>
          </div>
          <p className="text-2xl">Tell us what languages do you speak</p>

          {fields.map((field, i) => {
            return (
              <LanguageFormRow
                register={register}
                errors={errors}
                remove={remove}
                key={field.id}
                row={i}
              />
            );
          })}
          <button onClick={addFormRow} disabled={!isValid}>
            add language +
          </button>

          <div className="flex gap-4">
            <button type="reset" onClick={() => navigate(-1)}>
              back
            </button>
            <button type="submit" disabled={!isValid || isPending}>
              {isPending ? "saving languages..." : "next step"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

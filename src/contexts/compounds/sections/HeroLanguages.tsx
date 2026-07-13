import { useFieldArray, useForm } from "react-hook-form";
import type {
  Languages,
  TeacherLanguagesForm,
} from "../../../components/onboardingTeacher/TeacherLanguages";
import { useDashboard } from "../../useTeacherData";
import { useEffect } from "react";
import EditLanguageRow from "./ui/EditLanguageRow";
import { useUpdateLanguages } from "../../../components/onboardingTeacher/features/hooks/useUpdateLaguages";
import { useQueryClient } from "@tanstack/react-query";

export default function HeroLanguages({
  id,
  languages,
  teacherId,
}: {
  id: string;
  languages: Languages[] | undefined;
  teacherId: string | undefined;
}) {
  const { closeDialog, dialogDashboard, active } = useDashboard();
  const queryClient = useQueryClient();
  const { updateLanguage, isPending } = useUpdateLanguages(() => {
    queryClient.invalidateQueries({ queryKey: ["teacher-profile"] });
    closeDialog(dialogDashboard);
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<TeacherLanguagesForm>({
    defaultValues: {
      languages: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  useEffect(() => {
    if (!languages) return;

    reset({
      languages: languages,
    });
  }, [languages, reset]);

  if (id !== active) return null;

  function editLanguages(data: TeacherLanguagesForm) {
    updateLanguage({
      teacherId: teacherId,
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
    <div className="min-w-75 px-4 py-6 [&_input]:rounded max-[400px]:min-w-60 max-[400px]:px-2">
      <h2 className="max-[400px]:text-2xl">Edit your languages section</h2>
      <form
        onSubmit={handleSubmit(editLanguages)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          {fields.map((field, i) => {
            return (
              <EditLanguageRow
                register={register}
                errors={errors}
                remove={remove}
                key={field.id}
                row={i}
              />
            );
          })}
          <button onClick={addFormRow} disabled={!isValid}>
            add more +
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <button type="submit" className="bg-jade hover:bg-jade-light">
            {isPending ? "saving" : "save changes"}
          </button>
          <button type="reset" onClick={() => closeDialog(dialogDashboard)}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}

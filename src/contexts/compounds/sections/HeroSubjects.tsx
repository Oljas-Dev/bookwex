import { useFieldArray, useForm } from "react-hook-form";
import { useDashboard } from "../../useTeacherData";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type {
  Subjects,
  TeacherSubjectsForm,
} from "../../../components/onboardingTeacher/Subjects";
import { useUpdateSubjects } from "../../../components/onboardingTeacher/features/hooks/useUpdateSubjects";
import EditSubjectRow from "./ui/EditSubjectRow";
import toast from "react-hot-toast";

export default function HeroSubjects({
  id,
  subjects,
  teacherId,
}: {
  id: string;
  subjects: Subjects[] | undefined;
  teacherId: string | undefined;
}) {
  const { closeDialog, dialogDashboard, active } = useDashboard();

  const queryClient = useQueryClient();

  const { updateSubjects, isPending } = useUpdateSubjects(() => {
    queryClient.invalidateQueries({ queryKey: ["teacher-profile"] });
    closeDialog(dialogDashboard);
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<TeacherSubjectsForm>({
    defaultValues: {
      subjects: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  const subjectsCheck = watch("subjects");

  useEffect(() => {
    if (!subjects) return;

    reset({
      subjects: subjects,
    });
  }, [subjects, reset]);

  if (id !== active) return null;

  function sendSubjects(data: TeacherSubjectsForm) {
    const mainSubjects = data.subjects.filter(
      (subject) => subject.category === "main",
    );

    if (mainSubjects.length !== 1) {
      toast.error("Please select exactly one main subject.");
      return;
    }

    updateSubjects({
      teacherId: teacherId,
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
    <div className="min-w-75 px-4 py-6 [&_input]:rounded max-[400px]:min-w-60 max-[400px]:px-2">
      <h2 className="max-[400px]:text-2xl">Edit your languages section</h2>
      <form
        onSubmit={handleSubmit(sendSubjects)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          {fields.map((field, i) => {
            return (
              <EditSubjectRow
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

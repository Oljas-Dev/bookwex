import { useUpdateTeacherOffers } from "../../../components/MyOfferSection/features/hooks/useUpdateTeacherOffers";
import LessonOfferEditor from "../../../components/MyOfferSection/ui/LessonOfferEditor";
import type { TeacherLesson } from "../../../types/ui";
import { useDashboard } from "../../useTeacherData";
import { useDialog } from "../dashboard-dialog/useDialog";

export default function OffersSectionDialog({ id }: { id: string }) {
  const { active, lessons, setLessons, dialogDashboard } = useDashboard();
  const { closeDialog } = useDialog();
  const { updateLessons } = useUpdateTeacherOffers();

  if (id !== active) return null;

  function updateLessonField(
    lessonId: string,
    field: keyof TeacherLesson,
    value: string | number,
  ) {
    setLessons((prev) =>
      prev?.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, [field]: value } : lesson,
      ),
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateLessons(lessons);
    closeDialog(dialogDashboard);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 min-w-75 px-4 py-6 [&_input]:rounded"
    >
      <div className="grid grid-cols-3 gap-6">
        {lessons?.map((lesson, index) => (
          <LessonOfferEditor
            key={lesson.id}
            lesson={lesson}
            index={index}
            onChange={updateLessonField}
          />
        ))}
      </div>

      <button type="submit" className="bg-jade">
        save
      </button>
      <button type="reset" onClick={() => closeDialog(dialogDashboard)}>
        cancel
      </button>
    </form>
  );
}

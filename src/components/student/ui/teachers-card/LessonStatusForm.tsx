import { useState } from "react";
import { useUpdateLessonOutcome } from "../../features/useUpdateLessonOutcome";
import type { BookedCard, LessonCard } from "../../../../types/ui";

export default function LessonStatusForm({
  lesson,
}: {
  lesson: LessonCard | BookedCard;
}) {
  const [outcomes, setOutcomes] = useState<
    Record<string, "completed" | "no_show">
  >({});
  const [error, setError] = useState("");
  const { updateOutcome, isPending } = useUpdateLessonOutcome();

  function submitOutcome(
    e: React.FormEvent<HTMLFormElement>,
    lessonId: string,
  ) {
    e.preventDefault();

    if (!outcomes) {
      setError("Please choose status");
      return;
    }

    updateOutcome({
      bookingId: lessonId,
      role: lesson.viewerRole,
      outcome: outcomes[lessonId] ?? "completed",
    });
  }
  return (
    <form
      onSubmit={(e) => submitOutcome(e, lesson.lessonId)}
      className="flex flex-col gap-1"
    >
      <label htmlFor="chooseStatus" className="text-lg">
        Lesson status:
      </label>
      <select
        id="chooseStatus"
        value={outcomes[lesson.lessonId] ?? "completed"}
        onChange={(e) =>
          setOutcomes((prev) => ({
            ...prev,
            [lesson.lessonId]: e.target.value as "completed" | "no_show",
          }))
        }
        className="text-lg"
      >
        <option value="completed">completed</option>
        <option value="no_show">no show</option>
      </select>
      <button
        type="submit"
        className="p-0 hover:text-amber-100"
        disabled={isPending}
      >
        {isPending ? "saving" : "save status"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}

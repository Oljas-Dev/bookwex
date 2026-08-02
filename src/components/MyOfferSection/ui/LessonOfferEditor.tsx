import type { TeacherLesson } from "../../../types/ui";

export default function LessonOfferEditor({
  lesson,
  onChange,
  index,
}: {
  lesson: TeacherLesson;
  onChange: (
    lessonId: string,
    field: keyof TeacherLesson,
    value: string | number,
  ) => void;
  index: number;
}) {
  return (
    <div key={lesson.id} className="flex flex-col gap-4">
      <h3>Your offer #{index + 1}</h3>

      <div className="flex flex-col gap-2">
        <label htmlFor={`title-${lesson.id}`}>Your title</label>

        <input
          id={`title-${lesson.id}`}
          value={lesson.title}
          onChange={(e) => onChange(lesson.id, "title", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`goal-${lesson.id}`}>Lesson goal</label>

        <input
          id={`goal-${lesson.id}`}
          value={lesson.goal}
          onChange={(e) => onChange(lesson.id, "goal", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`method-${lesson.id}`}>Your method</label>

        <input
          id={`method-${lesson.id}`}
          value={lesson.method}
          onChange={(e) => onChange(lesson.id, "method", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`result-${lesson.id}`}>Results</label>

        <input
          id={`result-${lesson.id}`}
          value={lesson.result}
          onChange={(e) => onChange(lesson.id, "result", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`price-${lesson.id}`}>Price</label>

        <input
          id={`price-${lesson.id}`}
          type="number"
          value={lesson.price}
          onChange={(e) => onChange(lesson.id, "price", Number(e.target.value))}
        />
      </div>
    </div>
  );
}

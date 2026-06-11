import type { TeacherDescription } from "../../types/ui";

export default function AboutMeText({
  description,
}: {
  description: Partial<TeacherDescription | undefined>;
}) {
  return (
    <div className="text-center px-2">
      <h4>{description?.title}</h4>
      <p>{description?.content}</p>
    </div>
  );
}

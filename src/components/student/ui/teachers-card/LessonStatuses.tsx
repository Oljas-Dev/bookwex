import { Check2All } from "react-bootstrap-icons";
import Star from "../../../reviewsSection/ui/Star";

export default function LessonStatuses({
  rating,
}: {
  rating: number | undefined;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex gap-2">
        <p>Lesson status completed </p>
        <Check2All size={20} />
      </span>
      <div className="flex justify-end">
        {rating !== undefined && rating > 0 ? (
          Array.from({ length: 5 }, (_, i) => (
            <Star key={i} full={i < rating} color={"#dd9b0e"} size={64} />
          ))
        ) : (
          <p className="">no review yet</p>
        )}
      </div>
    </div>
  );
}

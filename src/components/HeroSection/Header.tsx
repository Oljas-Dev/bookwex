import { capitalizeAllFirst } from "../../helpers/features";
import type { ratingCalc } from "../../types/ui";
import Stars from "./ui/Stars";
import TeacherRating from "./ui/TeacherRating";

export default function Header({
  teachersName,
  rating,
}: {
  teachersName: string | undefined;
  rating: ratingCalc | undefined;
}) {
  const fullName = capitalizeAllFirst(teachersName) || "Guest";

  return (
    <div>
      <div className="flex items-center gap-8">
        <h1>{fullName}</h1>
        {rating?.review_count === undefined &&
        rating?.average_rating === undefined ? (
          <Stars />
        ) : (
          <TeacherRating
            rating={rating!.average_rating}
            reviewCount={rating!.review_count}
          />
        )}
      </div>
      <p className="font-semibold">teacher</p>
    </div>
  );
}

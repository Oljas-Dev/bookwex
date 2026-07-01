import { capitalizeAllFirst } from "../../helpers/features";
import type { ratingCalc } from "../../types/ui";
import Stars from "./ui/Stars";
import TeacherRating from "./ui/TeacherRating";

export default function Header({
  teachersName,
  rating,
  hidden = false,
}: {
  teachersName: string | undefined;
  rating: ratingCalc | undefined;
  hidden?: boolean;
}) {
  const fullName = capitalizeAllFirst(teachersName) || "Guest";

  return (
    <div className={`${hidden ? "hidden" : "block"} max-[900px]:mb-2`}>
      <div className="flex items-center gap-8 max-[900px]:gap-4">
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

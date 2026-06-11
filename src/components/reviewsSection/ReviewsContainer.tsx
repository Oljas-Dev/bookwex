import type { TeacherReview } from "../../types/ui";
import { getAvatarUrl } from "../avatars/features/useAvatar";
import ReviewCard from "./ui/ReviewCard";

export default function ReviewsContainer({
  reviews,
}: {
  reviews: TeacherReview[] | undefined;
}) {
  const reviewsMap = reviews?.map((review, i) => {
    const avatar = getAvatarUrl(review?.student?.avatar_url);
    const fullName = review?.student?.full_name;
    const content = review.review;
    const createdAt = review.created_at;

    return (
      <ReviewCard
        avatar={avatar || undefined}
        createdAt={createdAt}
        fullName={fullName || ""}
        review={content}
        key={i}
      />
    );
  });
  return <div className="flex justify-between">{reviewsMap}</div>;
}

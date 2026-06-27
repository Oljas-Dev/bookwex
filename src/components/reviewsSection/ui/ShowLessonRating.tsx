import { useTeacherReviews } from "../features/useTeacherReviews";
import LessonWithRating from "./LessonWithRating";
import OpenRatingForm from "./OpenRatingForm";

export default function ShowLessonRating({
  lessonId,
  teacherId,
}: {
  lessonId: string | undefined;
  teacherId: string | undefined;
}) {
  const { data, isLoading } = useTeacherReviews(teacherId);

  if (isLoading) return <p>rating...</p>;

  const currentReview = data?.find((review) => review.bookingId === lessonId);

  const rating = currentReview?.rating ? currentReview?.rating : null;
  const review = currentReview?.review;

  return (
    <>
      {rating ? (
        <LessonWithRating
          rating={rating}
          createdAt={currentReview?.createdAt}
          lessonId={lessonId}
          review={review}
        />
      ) : (
        <OpenRatingForm lessonId={lessonId} />
      )}
    </>
  );
}

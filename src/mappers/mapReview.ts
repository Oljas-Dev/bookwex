import type { Review, ReviewRow } from "../types/reviews";

export function mapReview(review: ReviewRow): Review {
  return {
    id: review.id,
    bookingId: review.booking_id,
    teacherId: review.teacher_id,
    studentId: review.student_id,

    reviewerName: review.reviewer_name,
    reviewerAvatar: review.reviewer_avatar,

    rating: review.rating,
    review: review.review,

    createdAt: review.created_at,
  };
}

export type ReviewRow = {
  id: string;
  booking_id: string;
  teacher_id: string;
  student_id: string;

  reviewer_name: string;
  reviewer_avatar: string | null;

  rating: number;
  review: string;

  created_at: string;
};

export type Review = {
  id: string;
  bookingId: string;
  teacherId: string;
  studentId: string;

  reviewerName: string;
  reviewerAvatar: string | undefined;

  rating: number;
  review: string;

  createdAt: string;
};

export interface PaginatedResponse<T> {
  reviews: T[];
  count: number;
  totalPages: number;
}

export type PaginatedTeacherReviews = PaginatedResponse<Review>;

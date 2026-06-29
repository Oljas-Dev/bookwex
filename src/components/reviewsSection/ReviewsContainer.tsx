import type { Dispatch, SetStateAction } from "react";
import type { PaginatedTeacherReviews } from "../../types/reviews";
import ReviewCard from "./ui/ReviewCard";
import { ArrowLeftSquare, ArrowRightSquare } from "react-bootstrap-icons";

export default function ReviewsContainer({
  reviews,
  page,
  setPage,
}: {
  reviews: PaginatedTeacherReviews | undefined;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex justify-between gap-2">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="bg-transparent border-0 px-1"
      >
        <ArrowLeftSquare color={page === 1 ? "gray" : "black"} size={24} />
      </button>
      <div className="flex gap-4">
        {reviews?.reviews?.map((review) => {
          return <ReviewCard key={review.id} review={review} />;
        })}
      </div>
      <button
        disabled={page >= (reviews?.totalPages ?? 1)}
        onClick={() => setPage((p) => p + 1)}
        className="bg-transparent border-0 px-1"
      >
        <ArrowRightSquare
          color={page >= (reviews?.totalPages ?? 1) ? "gray" : "black"}
          size={24}
        />
      </button>
    </div>
  );
}

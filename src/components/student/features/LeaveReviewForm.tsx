import { useCards } from "./context/useCards";

import { useState } from "react";
import { useAuth } from "../../../contexts/useAuth";
import StarRating from "../../reviewsSection/ui/StarRating";
import { useCreateReview } from "../../reviewsSection/features/useCreateReview";

export interface Updates {
  avatar_url: string | null;
  full_name: string | undefined;
}

export default function LeaveReviewForm({
  dialogFormRef,
}: {
  dialogFormRef: React.RefObject<HTMLDialogElement | null>;
}) {
  const { submitReview, isPending } = useCreateReview();
  const { user } = useAuth();
  const { activeLessonId, currentReview, rating } = useCards();
  const [review, setReview] = useState("");

  // Close dialog function
  function closeDialog() {
    dialogFormRef?.current?.close();
  }

  // Close dialog when clicking outside
  const handleClickOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogFormRef?.current;
    if (dialog && e.target === dialog) {
      closeDialog();
    }
  };

  function handleCancel() {
    closeDialog();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!activeLessonId || !rating) return;

    const newReview = {
      userId: user?.id,
      bookingId: activeLessonId,
      rating,
      review: review.trim(),
    };

    submitReview({ review: newReview });
    closeDialog();
  }

  return (
    <dialog
      ref={dialogFormRef}
      onClick={handleClickOutside}
      className="
    fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/0 backdrop:backdrop-blur-xs open:backdrop:bg-black/50 transition-all rounded
  "
    >
      <div className="flex flex-col gap-3 px-4 pt-3 pb-6">
        <h2>Edit your profile</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-100 max-[500px]:w-75 max-[400px]:w-55"
        >
          <div className="flex flex-col justify-center items-center gap-2">
            <StarRating />
            <label htmlFor="rating">Leave your review:</label>
            <textarea
              maxLength={500}
              onChange={(e) => setReview(e.target.value)}
              defaultValue={currentReview ? currentReview : ""}
              className="text-[16px] min-h-10 w-full border border-jet rounded px-2 py-3"
              placeholder="leave you review"
            />
          </div>

          <button type="submit" disabled={isPending}>
            {isPending ? "saving review..." : "save review"}
          </button>
          <button type="reset" onClick={handleCancel}>
            cancel
          </button>
        </form>
      </div>
    </dialog>
  );
}

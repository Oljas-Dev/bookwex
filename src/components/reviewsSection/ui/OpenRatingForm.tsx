import { useState } from "react";
import Star from "./Star";
import { useBookings } from "../../../contexts/useBookings";
import { useCards } from "../../student/features/context/useCards";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

interface starRating {
  lessonId: string | undefined;
  maxRating?: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: string[];
}

export default function OpenRatingForm({
  lessonId,
  maxRating = 5,
  color = "#fcc419",
  size = 64,
  className = "",
}: starRating) {
  const { dialogReviewForm } = useBookings();
  const { setActiveLessonId } = useCards();
  const [tempRating, setTempRating] = useState(0);

  function handleRating(value: number) {
    setTempRating(value);
  }

  function openReviewDialog() {
    setActiveLessonId(lessonId);
    dialogReviewForm.current?.showModal();
  }

  return (
    <div
      style={containerStyle}
      className={className}
      onClick={openReviewDialog}
    >
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            onClick={() => handleRating(i + 1)}
            key={i}
            full={tempRating && tempRating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}

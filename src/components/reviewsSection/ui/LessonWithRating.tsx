import dayjs from "dayjs";
import Star from "./Star";
import { PencilFill } from "react-bootstrap-icons";
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
  rating: number;
  review: string | undefined;
  createdAt: string | undefined;
  maxRating?: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: string[];
}

export default function LessonWithRating({
  lessonId,
  rating,
  review,
  createdAt,
  maxRating = 5,
  color = "#fcc419",
  size = 64,
  className = "",
}: starRating) {
  const { dialogReviewForm } = useBookings();
  const { setActiveLessonId, setCurrentReview } = useCards();

  const isEditable =
    createdAt && dayjs().isBefore(dayjs(createdAt).add(10, "minute"));

  function openReviewDialog() {
    setCurrentReview(review);
    setActiveLessonId(lessonId);
    dialogReviewForm.current?.showModal();
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star key={i} full={i < rating} color={color} size={size} />
        ))}
      </div>

      {isEditable && (
        <PencilFill size={18} cursor={"pointer"} onClick={openReviewDialog} />
      )}
    </div>
  );
}

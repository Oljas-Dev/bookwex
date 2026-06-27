import { useState } from "react";
import Star from "./Star";
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
  maxRating?: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: string[];
}

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 64,
  className = "",
}: starRating) {
  const { rating, setRating } = useCards();
  const [tempRating, setTempRating] = useState(0);

  function handleRating(value: number) {
    setRating(value);
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            onClick={() => handleRating(i + 1)}
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      {/* <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p> */}
    </div>
  );
}

/*
SPACING SYSTEM (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128

FONT SIZE SYSTEM (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 /52 / 62 / 74 / 86 / 98
*/

/*
FULL STAR




EMPTY STAR



*/

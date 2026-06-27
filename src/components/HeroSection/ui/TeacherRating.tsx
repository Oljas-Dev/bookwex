export default function TeacherRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <i key={`full-${i}`} className="bi bi-star-fill text-stars" />
      ))}

      {hasHalfStar && <i className="bi bi-star-half text-stars" />}

      {Array.from({
        length: 5 - fullStars - (hasHalfStar ? 1 : 0),
      }).map((_, i) => (
        <i key={`empty-${i}`} className="bi bi-star text-stars" />
      ))}

      <span className="ml-2 text-sm">
        {rating.toFixed(1)} ({reviewCount})
      </span>
    </div>
  );
}

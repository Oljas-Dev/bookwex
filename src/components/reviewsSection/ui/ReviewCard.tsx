import dayjs from "dayjs";
import CardContainer from "../../MyOfferSection/ui/CardContainer";
import { capitalizeAllFirst } from "../../../helpers/features";
import type { Review } from "../../../types/reviews";
import { getAvatarUrl } from "../../avatars/features/useAvatar";

export default function ReviewCard({ review }: { review: Review }) {
  const formattedDate = dayjs(review.createdAt).format("DD.MM.YYYY");

  //   const canEdit =
  //   dayjs().diff(dayjs(createdAt), "minute") < 10;

  return (
    <CardContainer styles="max-w-66.25">
      <div className="flex flex-col items-center gap-2 min-w-66 bg-peach py-3 border-b-2 border-jade-light">
        <img
          src={getAvatarUrl(review.reviewerAvatar)}
          alt={review.reviewerName.toLowerCase() + "avatar"}
          className="w-18 h-18 object-cover rounded-full border-2 border-jade"
        />
        <p className="text-2xl">{capitalizeAllFirst(review.reviewerName)}</p>
      </div>

      <div className="flex flex-col justify-between gap-2 bg-jade p-4 h-full">
        <p>{review.review}</p>
        <p>
          <strong>{formattedDate}</strong>
        </p>
      </div>
    </CardContainer>
  );
}

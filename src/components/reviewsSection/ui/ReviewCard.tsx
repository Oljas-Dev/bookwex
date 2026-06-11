import dayjs from "dayjs";
import CardContainer from "../../MyOfferSection/ui/CardContainer";
import { capitalizeAllFirst } from "../../../helpers/features";

export default function ReviewCard({
  avatar,
  fullName,
  review,
  createdAt,
}: {
  avatar: string | undefined;
  fullName: string;
  review: string;
  createdAt: string;
}) {
  const formattedDate = dayjs(createdAt).format("DD.MM.YYYY");

  //   const canEdit =
  //   dayjs().diff(dayjs(createdAt), "minute") < 10;

  return (
    <CardContainer styles="max-w-66.25">
      <div className="flex flex-col items-center gap-2 bg-peach py-3 border-b-2 border-jade-light">
        <img
          src={avatar}
          alt={fullName.toLowerCase() + "avatar"}
          className="w-18 h-18 object-cover rounded-full border-2 border-jade"
        />
        <p className="text-2xl">{capitalizeAllFirst(fullName)}</p>
      </div>

      <div className="flex flex-col gap-2 bg-jade p-4">
        <p>{review}</p>
        <p>
          <strong>{formattedDate}</strong>
        </p>
      </div>
    </CardContainer>
  );
}

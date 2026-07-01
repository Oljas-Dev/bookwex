import type { TeacherLesson } from "../../types/ui";
import OfferCard from "./ui/OfferCard";

export default function OffersContainer({
  offers,
}: {
  offers: TeacherLesson[] | undefined;
}) {
  const offerCardMap = offers?.map((offer, i) => {
    const title = offer.title;
    // const duration = offer.duration;
    const goal = offer.goal;
    const method = offer.method;
    const result = offer.result;
    const price = offer.price;

    return (
      <OfferCard
        title={title}
        // duration={duration}
        goal={goal}
        method={method}
        result={result}
        price={price}
        key={i}
      />
    );
  });

  return <div className="flex justify-center">{offerCardMap}</div>;
}

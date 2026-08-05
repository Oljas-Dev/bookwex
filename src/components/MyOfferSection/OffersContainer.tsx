import type { TeacherLesson } from "../../types/ui";
import PackageCard from "../lessonPackages/ui/PackageCard";
import OfferCard from "./ui/OfferCard";

export default function OffersContainer({
  lessonPackage,
  offers,
  justify = "justify-center",
}: {
  lessonPackage?: boolean;
  offers: TeacherLesson[] | undefined;
  justify?: string;
}) {
  if (!offers) return <p>No lesson types were found</p>;

  const offerCardMap = offers.map((offer) => {
    const title = offer.title;
    const goal = offer.goal;
    const method = offer.method;
    const result = offer.result;
    const price = offer.price;

    if (lessonPackage) {
      return (
        <PackageCard
          id={offer.id}
          title={title}
          goal={goal}
          method={method}
          result={result}
          price={price}
          key={offer.id}
        />
      );
    }

    return (
      <OfferCard
        title={title}
        goal={goal}
        method={method}
        result={result}
        price={price}
        key={offer.id}
      />
    );
  });

  return <div className={`flex ${justify}`}>{offerCardMap}</div>;
}

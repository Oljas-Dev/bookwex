import CardContainer from "./CardContainer";

export default function OfferCard({
  title,
  // duration,
  goal,
  method,
  result,
  price,
}: {
  title: string;
  // duration: number;
  goal: string;
  method: string;
  result: string;
  price: number;
}) {
  return (
    <CardContainer styles="max-w-75">
      {/* Offer card header */}
      <div className="flex flex-col items-center gap-2 bg-peach border-b-2 border-jade-light pt-4 pb-2">
        <h3>
          <strong>{title}</strong>
        </h3>
      </div>

      {/* Main content of a card */}
      <div className="flex-1 flex flex-col gap-4 bg-jade border-b-2 border-jade-light pt-6 pb-4 px-4 [&_p]:text-[16px]">
        <div className="flex gap-2">
          <p>🔶</p>
          <p>{goal}</p>
        </div>
        <div className="flex gap-2">
          <p>🔶</p>
          <p>{method}</p>
        </div>
        <div className="flex gap-2">
          <p>🔶</p>
          <p>{result}</p>
        </div>
      </div>

      {/* Price tag */}
      <div className="flex justify-center h-fit bg-peach py-6">
        <p className="text-xl">
          <strong>{price}$</strong>
        </p>
      </div>
    </CardContainer>
  );
}

import { Carousel } from "../../../ui/Carousel";
import { benefitsArray } from "../features/HomepageData";
import BenefitCard from "./BenefitCard";

export default function BenefitCards() {
  return (
    <div className="flex justify-around px-18 max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-4 max-[400px]:px-4">
      <Carousel
        items={benefitsArray}
        renderItem={(benefit) => {
          return (
            <BenefitCard
              text={benefit.text}
              title={benefit.title}
              key={benefit.id}
            />
          );
        }}
      />
    </div>
  );
}

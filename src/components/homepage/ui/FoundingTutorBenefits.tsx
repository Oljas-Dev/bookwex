import { foundingTutorBenefits } from "../features/HomepageData";

export default function FoundingTutorBenefits() {
  return (
    <ul className="flex flex-col gap-6 mt-4 pl-18">
      {foundingTutorBenefits.map((benefit) => {
        return (
          <li key={benefit.id}>
            <p className="text-xl! leading-9 max-[600px]:leading-5">
              {benefit.text}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

import { useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";
import FoundingTutorBenefits from "./FoundingTutorBenefits";
import { useFounderCount } from "../hooks/useFounderCount";
import SmallSpinner from "../../../ui/Spinner";

export default function CTA() {
  const { founderCount, isPending } = useFounderCount();

  const navigate = useNavigate();

  const displayFounderCount = founderCount ?? 0;

  const isFounderAvailable = displayFounderCount < 20;

  const founderNumber = displayFounderCount + 1;

  const founderStatus = isPending ? (
    <SmallSpinner />
  ) : (
    `Claim Founding Tutor #${founderNumber}`
  );

  return (
    <div className="flex flex-col gap-8 text-left px-18 max-[400px]:[&_p]:text-sm! max-[600px]:px-4">
      <h2>
        {isFounderAvailable
          ? "🌟 Limited offer Become a Founding Tutor"
          : "✨ Your teaching deserves a professional platform"}
      </h2>
      <p className="text-xl!">
        {isFounderAvailable
          ? "Applications are currently open for our first 20 Founding Tutors. As an early supporter, you'll receive exclusive benefits and have a direct influence on the platform's development."
          : "Join a platform built for independent tutors. Create your profile, showcase your skills, and connect with students looking for your expertise."}
      </p>
      {isFounderAvailable && (
        <div>
          <h3 className="font-bold max-[400px]:text-xl">
            Founding Tutor Benefits:
          </h3>
          <FoundingTutorBenefits />
        </div>
      )}

      <Button
        fn={() =>
          navigate(
            isFounderAvailable
              ? "/service-terms?program=founder"
              : "/service-terms",
          )
        }
        styles="self-center w-fit"
      >
        {founderCount === 20 ? "become tutor" : founderStatus}
      </Button>
    </div>
  );
}

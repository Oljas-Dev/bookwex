import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TeacherLesson } from "../../../types/ui";
import type { OnboardingOffer } from "../TeacherOffers";
import OfferForm from "./OfferForm";

interface OfferContainerProps {
  register: UseFormRegister<OnboardingOffer>;
  errors: FieldErrors<OnboardingOffer>;
  lessonFormats: TeacherLesson[] | undefined;
}

export default function OfferFormContainer({
  register,
  errors,
  lessonFormats,
}: OfferContainerProps) {
  return (
    <div className="w-[50%] max-[900px]:w-full px-4">
      {lessonFormats?.map((lesson, i) => {
        return (
          <OfferForm
            register={register}
            errors={errors}
            key={lesson.id}
            index={i}
          />
        );
      })}
    </div>
  );
}

import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { useTeacherProfile } from "../../api/features/useTeacherProfile";
import { Carousel } from "../../ui/Carousel";
import OfferForm from "./ui/OfferForm";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useUpdateTeacherOffers } from "../MyOfferSection/features/hooks/useUpdateTeacherOffers";

export interface OnboardingOffer {
  id: string;
  teacher_id: string;
  title: string;
  goal: string;
  method: string;
  result: string;
  price: string;
}

export interface TeacherOffersForm {
  offers: OnboardingOffer[];
}

export default function TeacherOffers() {
  const { user } = useAuth();
  const { data } = useTeacherProfile(user?.id);
  const { updateLessons, isPending } = useUpdateTeacherOffers();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TeacherOffersForm>({
    mode: "onChange",
    defaultValues: {
      offers: [],
    },
    shouldUnregister: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!data?.lessons) return;

    reset({
      offers: data.lessons.map((lesson) => ({
        id: lesson.id,
        teacher_id: user?.id,
        title: lesson.title ?? "",
        goal: lesson.goal ?? "",
        method: lesson.method ?? "",
        result: lesson.result ?? "",
        price: lesson.price?.toString() ?? "",
      })),
    });
  }, [data?.lessons, reset]);

  function sendSubjects(data: TeacherOffersForm) {
    const allOffersComplete = data.offers.every(
      (offer) =>
        offer.title.trim() &&
        offer.goal.trim() &&
        offer.method.trim() &&
        offer.result.trim() &&
        offer.price.trim(),
    );

    if (!allOffersComplete) {
      toast.error("Please fill in all three offers");
      return;
    }

    updateLessons(data.offers);
    navigate("/onboarding/complete");
  }

  return (
    <>
      <div className="w-full bg-jade py-8 text-center">
        <h2 className="font-bold text-3xl">Almost There 🚀</h2>
      </div>

      <form
        onSubmit={handleSubmit(sendSubjects)}
        className="flex flex-col items-center gap-4 w-full max-[500px]:px-2 max-[600px]:text-center"
      >
        <p className="text-2xl px-4">
          What kinds of lessons do you offer and their prices
        </p>

        <Carousel
          items={data?.lessons ?? []}
          renderItem={(offer, index) => (
            <OfferForm
              key={offer.id}
              register={register}
              errors={errors}
              index={index}
            />
          )}
          breakpoint={24000}
        />

        <div className="flex gap-4">
          <button type="button" onClick={() => navigate(-1)}>
            back
          </button>
          <button type="submit" disabled={!isValid || isPending}>
            {isPending ? "saving description..." : "finish onboarding"}
          </button>
        </div>
      </form>
    </>
  );
}

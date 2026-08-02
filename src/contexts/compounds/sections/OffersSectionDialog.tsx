import { useForm } from "react-hook-form";
import { useTeacherProfile } from "../../../api/features/useTeacherProfile";
import { useUpdateTeacherOffers } from "../../../components/MyOfferSection/features/hooks/useUpdateTeacherOffers";
import { useDashboard } from "../../useTeacherData";
import { useDialog } from "../dashboard-dialog/useDialog";
import type { TeacherOffersForm } from "../../../components/onboardingTeacher/TeacherOffers";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Carousel } from "../../../ui/Carousel";
import Button from "../../../ui/Button";
import EditOfferForm from "./ui/EditOfferForm";

export default function OffersSectionDialog({
  id,
  teacherId,
}: {
  id: string;
  teacherId: string | undefined;
}) {
  const { active, dialogDashboard } = useDashboard();
  const { closeDialog } = useDialog();
  const { updateLessons, isPending } = useUpdateTeacherOffers();
  const { data } = useTeacherProfile(teacherId);

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

  useEffect(() => {
    if (!data?.lessons) return;

    reset({
      offers: data.lessons.map((lesson) => ({
        id: lesson.id,
        teacher_id: teacherId,
        title: lesson.title ?? "",
        goal: lesson.goal ?? "",
        method: lesson.method ?? "",
        result: lesson.result ?? "",
        price: lesson.price ?? 0,
      })),
    });
  }, [data?.lessons, reset]);

  if (id !== active) return null;

  function sendSubjects(data: TeacherOffersForm) {
    const allOffersComplete = data.offers.every(
      (offer) =>
        offer.title.trim() &&
        offer.goal.trim() &&
        offer.method.trim() &&
        offer.result.trim() &&
        offer.price,
    );

    if (!allOffersComplete) {
      toast.error("Please fill in all three offers");
      return;
    }

    updateLessons(data.offers);
    closeDialog(dialogDashboard);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(sendSubjects)}
        className="flex flex-col items-center gap-4 px-6 py-4 max-[700px]:px-2 max-[700px]:text-center"
      >
        <p className="text-2xl px-4">Edit your offers and prices</p>

        <Carousel
          items={data?.lessons ?? []}
          renderItem={(offer, index) => (
            <EditOfferForm
              key={offer.id}
              register={register}
              errors={errors}
              index={index}
            />
          )}
          breakpoint={60900}
        />

        <div className="flex gap-4">
          <Button type="button" fn={() => closeDialog(dialogDashboard)}>
            cancel
          </Button>
          <Button type="submit" disabled={!isValid || isPending}>
            {isPending ? "saving description..." : "edit offers"}
          </Button>
        </div>
      </form>
    </>
  );
}

import { useDashboard } from "../../contexts/useTeacherData";
import type { TeacherLesson } from "../../types/ui";
import AppSection from "../../ui/AppSection";
import SectionsHeader from "../../ui/SectionsHeader";
import OffersContainer from "./OffersContainer";

export default function MyOffer({
  lessonOffers,
  teacherId,
}: {
  lessonOffers: TeacherLesson[] | undefined;
  teacherId: string;
}) {
  const { setActive, openDialog, dialogDashboard, setLessons } = useDashboard();

  function handleOffers() {
    setActive("offersDialog");
    setLessons(lessonOffers);
    openDialog(dialogDashboard);
  }

  // console.log(lessonOffers);

  return (
    <AppSection sectionId="myOfferSection">
      <SectionsHeader
        title="What do I offer"
        options={{ teacherOption: "edit", studentOption: "book lesson" }}
        fnTeacher={handleOffers}
        teacherId={teacherId}
      />
      <OffersContainer offers={lessonOffers} />
    </AppSection>
  );
}

import { useDashboard } from "../../contexts/useTeacherData";
import type { TeacherLesson } from "../../types/ui";
import AppSection from "../../ui/AppSection";
import SectionsHeader from "../../ui/SectionsHeader";
import OffersContainer from "./OffersContainer";

export default function MyOffer({
  lessonOffers,
}: {
  lessonOffers: TeacherLesson[] | undefined;
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
      />
      <OffersContainer offers={lessonOffers} />
    </AppSection>
  );
}

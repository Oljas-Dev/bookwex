import { useDashboard } from "../../contexts/useTeacherData";
import type { TeacherReview } from "../../types/ui";
import AppSection from "../../ui/AppSection";
import SectionsHeader from "../../ui/SectionsHeader";
import ReviewsContainer from "./ReviewsContainer";

export default function ReviewsSection({
  reviews,
}: {
  reviews: TeacherReview[] | undefined;
}) {
  const { setActive, openDialog, dialogDashboard } = useDashboard();

  function handleReviews() {
    setActive("reviewsDialog");
    openDialog(dialogDashboard);
  }
  return (
    <AppSection sectionId="reviewsSection">
      <SectionsHeader
        title="Students reviews"
        options={{ teacherOption: "edit", studentOption: "view all" }}
        fnTeacher={handleReviews}
      />
      <ReviewsContainer reviews={reviews} />
    </AppSection>
  );
}

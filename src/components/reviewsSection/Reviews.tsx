import { useState } from "react";
import { useDashboard } from "../../contexts/useTeacherData";
import AppSection from "../../ui/AppSection";
import SectionsHeader from "../../ui/SectionsHeader";
import { usePaginatedReviews } from "./features/usePageinatedReviews";
import ReviewsContainer from "./ReviewsContainer";

export default function ReviewsSection({ teacherId }: { teacherId: string }) {
  const [page, setPage] = useState(1);
  const { setActive, openDialog, dialogDashboard } = useDashboard();
  const { data: reviews } = usePaginatedReviews(teacherId, page);

  function handleReviews() {
    setActive("reviewsDialog");
    openDialog(dialogDashboard);
  }
  return (
    <AppSection sectionId="reviewsSection">
      <SectionsHeader
        title="Students reviews"
        options={{ teacherOption: "", studentOption: "" }}
        fnTeacher={handleReviews}
      />
      <ReviewsContainer reviews={reviews} setPage={setPage} page={page} />
    </AppSection>
  );
}

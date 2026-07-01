import { useState } from "react";
import { useDashboard } from "../../contexts/useTeacherData";
import AppSection from "../../ui/AppSection";
import SectionsHeader from "../../ui/SectionsHeader";
import { usePaginatedReviews } from "./features/usePageinatedReviews";
import ReviewsContainer from "./ReviewsContainer";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ReviewsSection({ teacherId }: { teacherId: string }) {
  const [page, setPage] = useState(1);
  const { setActive, openDialog, dialogDashboard } = useDashboard();

  const isMobile = useMediaQuery("(max-width:1024px)");
  const pageSize = isMobile ? 1 : 3;

  const { data: reviews } = usePaginatedReviews(teacherId, page, pageSize);

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

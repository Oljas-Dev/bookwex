import { useDashboard } from "../../contexts/useTeacherData";
import type { TeacherLesson } from "../../types/ui";
import AppSection from "../../ui/AppSection";
import { Carousel } from "../../ui/Carousel";
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
      <Carousel
        items={lessonOffers ?? []}
        renderItem={(offer) => <OffersContainer offers={[offer]} />}
      />
      {/* <OffersContainer offers={lessonOffers} /> */}
    </AppSection>
  );
}

{
  /* <div className="min-[400px]:hidden max-[400px]:flex gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-transparent border-0 px-1"
        >
          <ArrowLeftSquare color={page === 1 ? "gray" : "black"} size={24} />
        </button>

        <button
          disabled={...}
          onClick={() => setPage((p) => p + 1)}
          className="bg-transparent border-0 px-1"
        >
          <ArrowRightSquare
            color={... ? "gray" : "black"}
            size={24}
          />
        </button>
      </div> */
}

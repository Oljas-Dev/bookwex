import { useParams } from "react-router-dom";
import Calendar from "./Calendar";
import Hero from "./HeroSection/Hero";
import Navigation from "./navigation/Navigation";
import { useTeachers } from "../api/features/useTeachers";
import { toNormalStr } from "../helpers/features";
import { useTeacherProfile } from "../api/features/useTeacherProfile";
import MyOffer from "./MyOfferSection/MyOffer";
import ReviewsSection from "./reviewsSection/Reviews";
import VideoIntro from "./videoIntroduction/VideoIntro";
import { Dialogs } from "../contexts/compounds/dashboard-dialog/DialogContext";
import EmptyHeroSection from "./HeroSection/EmptyHeroSection";
import EmptySection from "../ui/EmptySection";

export default function Dashboard() {
  const { profiles, profilesLoading } = useTeachers();
  const { teacherName } = useParams();
  const currentTeacher = profiles?.find(
    (teacher) => toNormalStr(teacher.full_name) === toNormalStr(teacherName),
  );

  const { data: teacherData, isLoading } = useTeacherProfile(
    currentTeacher?.id,
  );

  if (profilesLoading || isLoading) return <p>waiting for teacher's data</p>;

  const hasOffers = teacherData?.lessons?.some(
    (lesson) =>
      lesson.title?.trim() &&
      lesson.goal?.trim() &&
      lesson.method?.trim() &&
      lesson.result?.trim() &&
      lesson.price != null,
  );

  return (
    <>
      <Navigation teacherId={currentTeacher?.id} />
      {/* Conditional rendering of Hero section based on available data  */}
      {teacherData?.descriptions ? (
        <Hero teacherData={teacherData} />
      ) : (
        <EmptyHeroSection teacherData={teacherData} />
      )}

      {/* Review section renders only if there are reviews */}
      {teacherData?.reviews !== undefined &&
        teacherData?.reviews?.length > 0 && (
          <ReviewsSection teacherId={teacherData?.id} />
        )}

      {/* Conditional rendering of Video section based on available data  */}
      {teacherData?.video_intro ? (
        <VideoIntro
          src={teacherData?.video_intro || undefined}
          teacherId={teacherData?.id}
        />
      ) : (
        <EmptySection
          sectionId="emptyVideoSection"
          btnText="upload you video"
          h2="Video introduction section is empty"
          dialogId="videoDialog"
          teacherId={currentTeacher?.id}
        />
      )}

      {/* Conditional rendering of MyOffer section based on available data  */}
      {hasOffers ? (
        <MyOffer
          lessonOffers={teacherData?.lessons}
          teacherId={teacherData?.id}
        />
      ) : (
        <EmptySection
          sectionId="emptyOfferSection"
          btnText="let people know what do you offer"
          h2="Your offer section is empty"
          dialogId="emptyOfferDialog"
          teacherId={currentTeacher?.id}
        />
      )}

      <Calendar teacherId={teacherData?.id} />

      <Dialogs>
        <Dialogs.VideoSection id="videoDialog" />
        <Dialogs.ReviewsSection id="reviewsDialog" />
        <Dialogs.OffersSection id="offersDialog" />
        <Dialogs.HeroSection id="heroesDialog" teacherId={teacherData?.id} />
        <Dialogs.EmptyOffer id="emptyOfferDialog" />
        <Dialogs.HeroLanguages
          id="editLanguages"
          languages={teacherData?.experience?.languages}
          teacherId={teacherData?.id}
        />
        <Dialogs.HeroSubjects
          id="editSubjects"
          subjects={teacherData?.experience?.subjects}
          teacherId={teacherData?.id}
        />
        <Dialogs.HeroYears
          id="editYears"
          startYear={teacherData?.experience?.start_year.toString() || ""}
          teacherId={teacherData?.id}
        />
      </Dialogs>
    </>
  );
}

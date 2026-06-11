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

  const { data: teacherData } = useTeacherProfile(currentTeacher?.id);

  if (profilesLoading) return <p>waiting for teacher's data</p>;

  // console.log(teacherData);

  return (
    <>
      <Navigation />
      {/* Conditional rendering of Hero section based on available data  */}
      {teacherData?.descriptions ? (
        <Hero teacherData={teacherData} />
      ) : (
        <EmptyHeroSection teacherData={teacherData} />
      )}

      {/* Review section renders only if there are reviews */}
      {teacherData?.reviews !== undefined &&
        teacherData?.reviews?.length > 0 && (
          <ReviewsSection reviews={teacherData?.reviews} />
        )}

      {/* Conditional rendering of Video section based on available data  */}
      {teacherData?.video_intro ? (
        <VideoIntro src={teacherData?.video_intro || undefined} />
      ) : (
        <EmptySection
          sectionId="emptyVideoSection"
          btnText="upload you video"
          h2="Video introduction section is empty"
          dialogId="videoDialog"
        />
      )}

      {/* Conditional rendering of MyOffer section based on available data  */}
      {teacherData?.lessons !== undefined &&
      teacherData?.lessons?.length > 0 ? (
        <MyOffer lessonOffers={teacherData?.lessons} />
      ) : (
        <EmptySection
          sectionId="emptyVideoSection"
          btnText="let people know what
 do you offer"
          h2="Your offer section is empty"
          dialogId="emptyOfferDialog"
        />
      )}

      <Calendar />

      <Dialogs>
        <Dialogs.VideoSection id="videoDialog" />
        <Dialogs.ReviewsSection id="reviewsDialog" />
        <Dialogs.OffersSection id="offersDialog" />
        <Dialogs.HeroSection id="heroesDialog" teacherId={teacherData?.id} />
        <Dialogs.EmptyOffer id="emptyOfferDialog" />
      </Dialogs>
    </>
  );
}

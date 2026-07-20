import { useAuth } from "../../contexts/useAuth";
import HomepageNav from "./ui/HomepageNav";
import SectionWithPicture from "./ui/PictureSubSection";
import CardsSubSection from "./ui/CardSubsection";
import BenefitCards from "./ui/BenefitCards";
import StepsRow from "./ui/StepsRow";
import Features from "./ui/Features";
import IndependentTutors from "./ui/IndependentTutors";
import FAQ from "./ui/FAQ";
import CTA from "./ui/CTA";
import Footer from "../footer/Footer";
import DemoPagePresentation from "./ui/DemoPagePresentation";

import firstImage from "./../../assets/homepage-1.png";
import secondImage from "./../../assets/homepage-2.png";
import thirdImage from "./../../assets/homepage-3.png";
import fourthImage from "./../../assets/homepage-4.png";

export default function BookwexLanding() {
  const { user, isTeacher, isAdmin } = useAuth();
  const isAuthenticated = user?.role === "authenticated";

  return (
    <>
      {" "}
      <HomepageNav isUser={isAuthenticated} />
      <div className="flex flex-col gap-17 [&_h2]:text-3xl [&_h2]:font-bold max-[400px]:[&_h2]:text-xl">
        <SectionWithPicture
          isLeftSide
          alt="Woman working on laptop"
          img={firstImage}
        >
          <div className="flex flex-col pt-9 max-[900px]:gap-4">
            <h2>The easiest way to manage your tutoring business.</h2>
            <p className="flex-1 place-content-center">
              Bookwex helps tutors schedule lessons, accept bookings, and share
              a professional profile—all in one place.
            </p>
          </div>
        </SectionWithPicture>

        <CardsSubSection title="Why Bookwex?">
          <BenefitCards />
        </CardsSubSection>

        <SectionWithPicture
          isLeftSide={false}
          img={secondImage}
          alt="Freelancer picture"
        >
          <div className="flex flex-col gap-11 flex-1 p-6 max-[400px]:gap-4 max-[400px]:px-0">
            <h2>How it works</h2>
            <ul className="flex flex-col gap-2 items-center text-center">
              <StepsRow icon="⬇️" text="Create your profile" />
              <StepsRow icon="⬇️" text="Set your availability" />
              <StepsRow icon="That’s it 👍" text="Share your booking link" />
            </ul>
          </div>
        </SectionWithPicture>

        <CardsSubSection title="Everything you need">
          <Features />
        </CardsSubSection>

        <SectionWithPicture isLeftSide img={thirdImage} alt="woman in cafe">
          <DemoPagePresentation isTeacher={isTeacher || isAdmin} user={user} />
        </SectionWithPicture>

        <CardsSubSection title="Built by Tutors for Independent Tutors">
          <IndependentTutors />
        </CardsSubSection>

        <SectionWithPicture
          isLeftSide={false}
          img={fourthImage}
          alt="workspace picture"
          styles="h-120 max-[900px]:h-auto"
        >
          <FAQ />
        </SectionWithPicture>

        {!isAuthenticated && (
          <CardsSubSection
            id="foundingTutorSection"
            title="Ready to grow your tutoring business?"
          >
            <CTA />
          </CardsSubSection>
        )}

        <Footer />
      </div>
    </>
  );
}

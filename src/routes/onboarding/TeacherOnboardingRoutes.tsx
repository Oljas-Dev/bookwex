import { Route } from "react-router-dom";
import OnboardingLayout from "../../components/onboardingTeacher/OnboardingLayout";
import WelcomePage from "../../components/onboardingTeacher/WelcomePage";
import TeacherLanguages from "../../components/onboardingTeacher/TeacherLanguages";
import Subjects from "../../components/onboardingTeacher/Subjects";
import Description from "../../components/onboardingTeacher/Description";
import UploadVideo from "../../components/onboardingTeacher/UploadVideo";
import TeacherOffers from "../../components/onboardingTeacher/TeacherOffers";
import OnboardingComplete from "../../components/onboardingTeacher/OnboardingComplete";

export const teacherOnboardingRoutes = (
  <>
    <Route path="onboarding" element={<OnboardingLayout />}>
      <Route path="welcome-teacher" element={<WelcomePage />} />
      <Route path="update-languages" element={<TeacherLanguages />} />
      <Route path="subject" element={<Subjects />} />
      <Route path="description" element={<Description />} />
      <Route path="video" element={<UploadVideo />} />
      <Route path="teacher-offers" element={<TeacherOffers />} />
      <Route path="complete" element={<OnboardingComplete />} />
    </Route>
  </>
);

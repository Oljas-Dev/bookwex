import { Navigate, Route } from "react-router-dom";
import Homepage from "../../components/homepage/Homepage";
import BookwexLanding from "../../components/homepage/BookwexLanding";
import ProtectedRoute from "../../components/authentication/protected-route/ProtectedRoute";
import StudentDashboard from "../../components/student/StudentDashboard";
import Chats from "../../components/chats/Chats";
import MyChats from "../../components/chats/MyChat";
import PrivacyPolicy from "../../components/privacy/PrivacyPolicy";
import TermsOfService from "../../components/privacy/TermsOfService";
import AboutBookwex from "../../components/privacy/AboutBookwex";
import ContactUs from "../../components/footer/ContactUs";
import HelpCenter from "../../components/footer/HelpCenter";
import ReportProblem from "../../components/footer/ReportProblem";
import FoundingTutorsProgram from "../../components/privacy/FoundingTutorsProgram";
import ConnectCalendar from "../../components/connectCalendar/ConnectCalendar";

export const connectCalendar = "connect-calendar";

export const homepageRoutes = (
  <>
    <Route path="/" element={<Homepage />}>
      <Route index element={<Navigate replace to="homepage" />} />

      <Route path="homepage" element={<BookwexLanding />} />

      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="chat-room/:lessonId" element={<Chats />} />
      <Route
        path="chat-room"
        element={
          <ProtectedRoute>
            <MyChats />
          </ProtectedRoute>
        }
      />

      {/* Privacy Policy */}
      <Route path="privacy" element={<PrivacyPolicy />} />
      {/* Terms of Service */}
      <Route path="terms" element={<TermsOfService />} />
      {/* About Bookwex */}
      <Route path="about" element={<AboutBookwex />} />
      {/* Contact Us */}
      <Route path="contact" element={<ContactUs />} />
      {/* Help Center */}
      <Route path="help-center" element={<HelpCenter />} />
      {/* Report a Problem */}
      <Route path="report-problem" element={<ReportProblem />} />
      {/* Founding Tutors Program */}
      <Route path="service-terms" element={<FoundingTutorsProgram />} />
      {/* Synchronize calendars */}
      <Route path={connectCalendar} element={<ConnectCalendar />} />
    </Route>
  </>
);

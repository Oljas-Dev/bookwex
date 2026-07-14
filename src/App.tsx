import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { BookingContextProvider } from "./contexts/BookingContext";
import { CalendarProvider } from "./contexts/CalendarContext";

import Applayout from "./components/Applayout";
import Dashboard from "./components/Dashboard";
import Planner from "./components/Planner";
import CheckTimeSlots from "./components/calendarComponents/CheckTimeSlots";
import BookingConfirmation from "./ui/BookingConfirmation";
import SignIn from "./components/authentication/login/SignIn";
import LogOut from "./components/authentication/logout/LogOut";
import SignUp from "./components/authentication/signup/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import StudentDashboard from "./components/student/StudentDashboard";
import Chats from "./components/chats/Chats";
import { MessagesProvider } from "./contexts/MessagesContext";
import MyChats from "./components/chats/MyChat";
import AuthCallback from "./components/authentication/AuthCallback";
import ChangePasswordDialog from "./components/authentication/change-password/ChangePassword";
import ForgotPassword from "./components/authentication/forgot-password/ForgotPassword";
import ResetPassword from "./components/authentication/forgot-password/ResetPassword";
import { TeacherDataProvider } from "./contexts/TeacherDataContext";
import BecomeTeacher from "./components/authentication/become-teacher/BecomeTeacher";
import SignUpSuccess from "./ui/SignUpSuccess";
import ProtectedRoute from "./components/authentication/protected-route/ProtectedRoute";
import AdminDashboard from "./components/support/AdminDashboard";
import RoleRoute from "./components/authentication/protected-route/RoleRoute";
import WelcomePage from "./components/onboardingTeacher/WelcomePage";
import TeacherLanguages from "./components/onboardingTeacher/TeacherLanguages";
import Subjects from "./components/onboardingTeacher/Subjects";
import Description from "./components/onboardingTeacher/Description";
import UploadVideo from "./components/onboardingTeacher/UploadVideo";
import TeacherOffers from "./components/onboardingTeacher/TeacherOffers";
import OnboardingComplete from "./components/onboardingTeacher/OnboardingComplete";
import OnboardingLayout from "./components/onboardingTeacher/OnboardingLayout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TeacherDataProvider>
          <CalendarProvider>
            <BookingContextProvider>
              <MessagesProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <main className="flex flex-col justify-center items-center  text-3xl bg-main-bg xl:py-6">
                    <Routes>
                      <Route
                        path="admin"
                        element={
                          <RoleRoute allowedRoles={["admin"]}>
                            <AdminDashboard />
                          </RoleRoute>
                        }
                      />
                      <Route path="/auth/callback" element={<AuthCallback />} />
                      <Route path="login" element={<SignIn />} />
                      <Route
                        path="profile/become-teacher"
                        element={
                          <ProtectedRoute>
                            <BecomeTeacher />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="teacher/:teacherName/logout"
                        element={<LogOut />}
                      />
                      <Route
                        path="change-password"
                        element={<ChangePasswordDialog />}
                      />
                      <Route
                        path="forgot-password"
                        element={<ForgotPassword />}
                      />
                      <Route
                        path="reset-password"
                        element={<ResetPassword />}
                      />
                      <Route path="signup" element={<SignUp />} />
                      <Route
                        path="success-signup"
                        element={<SignUpSuccess />}
                      />

                      {/* Teacher onboarding */}
                      <Route path="onboarding" element={<OnboardingLayout />}>
                        <Route
                          path="welcome-teacher"
                          element={<WelcomePage />}
                        />
                        <Route
                          path="update-languages"
                          element={<TeacherLanguages />}
                        />
                        <Route path="subject" element={<Subjects />} />
                        <Route path="description" element={<Description />} />
                        <Route path="video" element={<UploadVideo />} />
                        <Route
                          path="teacher-offers"
                          element={<TeacherOffers />}
                        />
                        <Route
                          path="onboarding-complete"
                          element={<OnboardingComplete />}
                        />
                      </Route>

                      {/* Main Page */}
                      <Route path="/" element={<Applayout />}>
                        <Route
                          index
                          element={<Navigate replace to="login" />}
                        />
                        <Route
                          path="teacher/:teacherName"
                          element={<Dashboard />}
                        />
                        <Route
                          path="teacher/:teacherName/planner"
                          element={
                            <RoleRoute allowedRoles={["teacher", "admin"]}>
                              <Planner />
                            </RoleRoute>
                          }
                        />
                        <Route
                          path="teacher/:teacherName/bookLesson/:dayId"
                          element={<CheckTimeSlots />}
                        />
                        <Route
                          path="teacher/:teacherName/bookLesson/:dayId/:lessonId"
                          element={<BookingConfirmation />}
                        />
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
                      </Route>
                    </Routes>
                    <Toaster
                      toastOptions={{
                        duration: 3000,
                        style: {
                          fontSize: "14px",
                          background: "#abd1c6",
                          color: "#312f2c",
                        },
                      }}
                    />
                  </main>
                </LocalizationProvider>
              </MessagesProvider>
            </BookingContextProvider>
          </CalendarProvider>
        </TeacherDataProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

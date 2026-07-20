import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { BookingContextProvider } from "./contexts/BookingContext";
import { CalendarProvider } from "./contexts/CalendarContext";

import SignIn from "./components/authentication/login/SignIn";
import LogOut from "./components/authentication/logout/LogOut";
import SignUp from "./components/authentication/signup/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { MessagesProvider } from "./contexts/MessagesContext";
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
import SignupTeacher from "./components/authentication/signup-teacher/SignupTeacher";
import ScrollToPageTop from "./ui/ScrollToPageTop";
import { homepageRoutes } from "./routes/homepage/HomepageRoutes";
import { teacherOnboardingRoutes } from "./routes/onboarding/TeacherOnboardingRoutes";
import { teacherRoutes } from "./routes/teacher/teacherRoutes";
import AuthLayout from "./components/authentication/AuthLayout";

// xl:py-6
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TeacherDataProvider>
          <CalendarProvider>
            <BookingContextProvider>
              <MessagesProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <ScrollToPageTop />
                  <main className="flex flex-col justify-center items-center  text-3xl bg-main-bg ">
                    <Routes>
                      <Route
                        path="admin"
                        element={
                          <RoleRoute allowedRoles={["admin"]}>
                            <AdminDashboard />
                          </RoleRoute>
                        }
                      />
                      <Route path="auth" element={<AuthLayout />}>
                        <Route path="callback" element={<AuthCallback />} />
                        <Route path="login" element={<SignIn />} />
                        <Route
                          path="become-teacher"
                          element={
                            <ProtectedRoute>
                              <BecomeTeacher />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="signup-teacher"
                          element={<SignupTeacher />}
                        />
                        <Route path="logout" element={<LogOut />} />
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
                      </Route>

                      {teacherOnboardingRoutes}
                      {homepageRoutes}
                      {teacherRoutes}
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

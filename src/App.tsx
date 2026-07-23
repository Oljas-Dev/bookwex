import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { BookingContextProvider } from "./contexts/BookingContext";
import { CalendarProvider } from "./contexts/CalendarContext";

import { AuthProvider } from "./contexts/AuthContext";
import { MessagesProvider } from "./contexts/MessagesContext";
import { TeacherDataProvider } from "./contexts/TeacherDataContext";
import AdminDashboard from "./components/support/AdminDashboard";
import RoleRoute from "./components/authentication/protected-route/RoleRoute";
import ScrollToPageTop from "./ui/ScrollToPageTop";
import { homepageRoutes } from "./routes/homepage/HomepageRoutes";
import { teacherOnboardingRoutes } from "./routes/onboarding/TeacherOnboardingRoutes";
import { teacherRoutes } from "./routes/teacher/teacherRoutes";
import { authRoutes } from "./routes/auth/AuthRoutes";

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
                      {authRoutes}
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

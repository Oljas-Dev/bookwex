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
import { AuthContext } from "./contexts/AuthContext";
import StudentDashboard from "./components/student/StudentDashboard";
import Chats from "./components/chats/Chats";

function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <CalendarProvider>
          <BookingContextProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <main className="flex flex-col justify-center items-center min-h-screen text-3xl bg-main-bg pb-20">
                <Routes>
                  <Route path="login" element={<SignIn />} />
                  <Route
                    path="teacher/:teacherName/logout"
                    element={<LogOut />}
                  />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="/" element={<Applayout />}>
                    <Route
                      index
                      element={<Navigate replace to="teacher/:teacherName" />}
                    />
                    <Route
                      path="teacher/:teacherName"
                      element={<Dashboard />}
                    />
                    <Route
                      path="teacher/:teacherName/planner"
                      element={<Planner />}
                    />
                    <Route
                      path="teacher/:teacherName/bookLesson/:dayId"
                      element={<CheckTimeSlots />}
                    />
                    <Route
                      path="teacher/:teacherName/bookLesson/:dayId/:lessonId"
                      element={<BookingConfirmation />}
                    />
                    <Route path="student" element={<StudentDashboard />} />
                    <Route
                      path="teacher/:teacherName/chat-room"
                      element={<Chats />}
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
          </BookingContextProvider>
        </CalendarProvider>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;

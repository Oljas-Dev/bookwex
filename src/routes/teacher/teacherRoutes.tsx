import { Route } from "react-router-dom";
import Applayout from "../../components/Applayout";
import Dashboard from "../../components/Dashboard";
import RoleRoute from "../../components/authentication/protected-route/RoleRoute";
import Planner from "../../components/Planner";
import CheckTimeSlots from "../../components/calendarComponents/CheckTimeSlots";
import BookingConfirmation from "../../ui/BookingConfirmation";

export const teacherRoutes = (
  <>
    <Route path="/teacher" element={<Applayout />}>
      <Route path=":teacherName" element={<Dashboard />} />
      <Route
        path=":teacherName/planner"
        element={
          <RoleRoute allowedRoles={["teacher", "admin"]}>
            <Planner />
          </RoleRoute>
        }
      />
      <Route
        path=":teacherName/bookLesson/:dayId"
        element={<CheckTimeSlots />}
      />
      <Route
        path=":teacherName/bookLesson/:dayId/:lessonId"
        element={<BookingConfirmation />}
      />
    </Route>
  </>
);

import { useNavigate } from "react-router-dom";
// import { sendEmail } from "../api/emails/useResendEmail";
import MonthsSlider from "./calendarComponents/MonthsSlider";
import ShowCurrentMonth from "./calendarComponents/ShowCurrentMonth";
import ShowNextMonth from "./calendarComponents/ShowNextMonth";
import ShowPreviousMonth from "./calendarComponents/ShowPreviousMonth";
import WeekDays from "./calendarComponents/WeekDays";
import { useAuth } from "../contexts/useAuth";
import { toParamStr } from "../helpers/features";
import Button from "../ui/Button";

export default function Calendar({
  teacherId,
  teacherName,
}: {
  teacherId: string | undefined;
  teacherName: string | undefined;
}) {
  const { canEditProfile, user } = useAuth();

  const navigate = useNavigate();

  return (
    <div
      id="calendar"
      className="bg-jade text-jet text-center w-full px-10 pt-6 pb-15"
    >
      <MonthsSlider />
      <WeekDays />
      <div className="calendar-grid">
        <ShowPreviousMonth />
        <ShowCurrentMonth teacherId={teacherId} />
        <ShowNextMonth />
      </div>
      {canEditProfile(teacherId) && (
        <Button
          fn={() => navigate(`/teacher/${toParamStr(teacherName)}/planner`)}
        >
          plan your lessons
        </Button>
      )}
      {!user && (
        <p>"You are not logged in, please log in to book your lessons!"</p>
      )}
    </div>
  );
}

{
  /* <button onClick={handleSendEmail}>send email</button> */
}

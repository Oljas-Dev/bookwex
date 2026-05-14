import { useNavigate } from "react-router-dom";
// import { sendEmail } from "../api/emails/useResendEmail";
import MonthsSlider from "./calendarComponents/MonthsSlider";
import ShowCurrentMonth from "./calendarComponents/ShowCurrentMonth";
import ShowNextMonth from "./calendarComponents/ShowNextMonth";
import ShowPreviousMonth from "./calendarComponents/ShowPreviousMonth";
import WeekDays from "./calendarComponents/WeekDays";
import { useUser } from "../api/features/useUser";
import useProfile from "../api/features/useProfile";
import { useAuth } from "../contexts/useAuth";
import { toParamStr } from "../helpers/features";

export default function Calendar() {
  const { isTeacher } = useAuth();
  const { user } = useUser();
  const { profile } = useProfile();

  const navigate = useNavigate();

  // console.log(isTeacher);

  if (!profile) return <p>Waiting for profile to load...</p>;

  // async function handleSendEmail() {
  //   try {
  //     await sendEmail([
  //       {
  //         to: "delivered@resend.dev",
  //         subject: "One step closer to Tutor Web App release",
  //         html: `<div>
  //           <h1>You have done this part!</h1>
  //           <p>Your server works successfully and sends emails using Resend.</p>
  //           <p>Congratulations, on finishing this part!</p>
  //           <p>You are well done! 😉🚀</p>
  //       </div>`,
  //       },
  //       {
  //         to: "delivered@resend.dev",
  //         subject: "Your have booked your lesson on 22.22.2222",
  //         html: `<div>
  //           <h1>You have done this part!</h1>
  //           <p>Teacher will wait for, no shows are not excused.</p>
  //           <p>Please do come!!!</p>
  //           <p>From your loving Teacher!!!</p>
  //       </div>`,
  //       },
  //     ]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  return (
    <div className="bg-jade text-jet text-center w-full px-10 pt-6 pb-15">
      <MonthsSlider />
      <WeekDays />
      <div className="calendar-grid">
        <ShowPreviousMonth />
        <ShowCurrentMonth />
        <ShowNextMonth />
      </div>
      {isTeacher && (
        <button
          onClick={() =>
            navigate(`/teacher/${toParamStr(profile?.full_name)}/planner`)
          }
        >
          plan your lessons
        </button>
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

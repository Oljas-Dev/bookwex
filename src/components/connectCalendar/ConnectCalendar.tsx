import { useAuth } from "../../contexts/useAuth";
import BackButton from "../../ui/BackButton";
import { useGetGoogleCalendar } from "./features/hook/useGetGoogleCalendar";
import ActiveGoogleCalendar from "./ui/ActiveGoogleCalendar";
import Loader from "./ui/Loader";
import NoGoogleCalendar from "./ui/NoGoogleCalendar";

export default function ConnectCalendar() {
  const { profile } = useAuth();
  const { calendar, isPending } = useGetGoogleCalendar();

  if (isPending) return <Loader />;

  return (
    <section className="flex flex-col gap-6 w-full px-6 py-8">
      <BackButton mg="0" />
      {calendar?.sync_status === "active" ? (
        <ActiveGoogleCalendar
          profile={profile}
          syncDate={calendar?.last_synced_at}
        />
      ) : (
        <NoGoogleCalendar teacherEmail={profile?.email} />
      )}
    </section>
  );
}

import { Gear } from "react-bootstrap-icons";
import { useAuth } from "../../contexts/useAuth";
import Header from "./Header";
import type { TeacherProfile } from "../../types/ui";
import Avatar from "./Avatar";
import { useDashboard } from "../../contexts/useTeacherData";

export default function EmptyHeroSection({
  teacherData,
}: {
  teacherData: TeacherProfile | undefined;
}) {
  const { canEditProfile } = useAuth();
  const { setActive, dialogDashboard, openDialog } = useDashboard();

  function handleOpenDialog() {
    setActive("heroesDialog");
    openDialog(dialogDashboard);
  }

  return (
    <section
      id="emptyHeroSection"
      className="grid grid-cols-[70%_30%] w-full bg-jade px-10 py-6 mb-8 relative"
    >
      {canEditProfile(teacherData?.id) && (
        <Gear
          size={20}
          className="absolute top-3 right-3 cursor-pointer hover:rotate-45"
          onClick={handleOpenDialog}
        />
      )}
      <div className="flex flex-col gap-5">
        <Header
          teachersName={teacherData?.full_name}
          rating={teacherData?.rating_calc}
        />
        <h2>Introduce yourself</h2>
        <span>
          <p>Tell students about your experience and teaching style.</p>
        </span>
        {canEditProfile(teacherData?.id) && (
          <button className="max-w-fit" onClick={handleOpenDialog}>
            edit profile
          </button>
        )}
      </div>
      <Avatar teacherData={teacherData} />
    </section>
  );
}

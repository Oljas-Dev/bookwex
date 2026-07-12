import AboutMeText from "./AboutMeText";
import Achievements from "./Achievements";
import Avatar from "./Avatar";
import Header from "./Header";
import type { TeacherProfile } from "../../types/ui";
import { Gear } from "react-bootstrap-icons";
import { useDashboard } from "../../contexts/useTeacherData";
import { useAuth } from "../../contexts/useAuth";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Hero({
  teacherData,
}: {
  teacherData: TeacherProfile | undefined;
}) {
  const { canEditProfile } = useAuth();
  const {
    setActive,
    openDialog,
    dialogDashboard,
    setContent,
    setHours,
    setLanguages,
    setStartYear,
    setTitle,
    setSocialLinks,
  } = useDashboard();

  console.log(teacherData);

  function handleHero() {
    setActive("heroesDialog");
    setStartYear(
      teacherData?.experience.start_year
        ? String(teacherData?.experience.start_year)
        : "0",
    );
    setLanguages(
      teacherData?.experience.languages
        ? teacherData?.experience.languages.join(", ")
        : "0",
    );
    setHours(
      teacherData?.experience.hours
        ? String(teacherData?.experience.hours)
        : "0",
    );
    setTitle(
      teacherData?.descriptions.title
        ? teacherData?.descriptions.title
        : "no title yet",
    );
    setContent(
      teacherData?.descriptions.content
        ? teacherData?.descriptions.content
        : "no description yet",
    );
    setSocialLinks(teacherData?.socialLinks ?? []);

    openDialog(dialogDashboard);
  }

  const tablet = useMediaQuery("(max-width:900px)");

  return (
    <section
      id="heroSection"
      className="grid grid-cols-[70%_30%] w-full bg-jade px-10 py-6 mb-8 relative max-[900px]:flex max-[900px]:flex-col-reverse max-[900px]:items-center max-[900px]:gap-6"
    >
      {canEditProfile(teacherData?.id) && (
        <Gear
          size={20}
          className="absolute top-3 right-3 cursor-pointer hover:rotate-45"
          onClick={handleHero}
        />
      )}
      <div className="flex flex-col gap-5">
        <Header
          teachersName={teacherData?.full_name}
          rating={teacherData?.rating_calc}
          hidden={tablet}
        />
        <Achievements experience={teacherData?.experience} />
        <AboutMeText description={teacherData?.descriptions} />
      </div>
      <Avatar teacherData={teacherData} />
    </section>
  );
}

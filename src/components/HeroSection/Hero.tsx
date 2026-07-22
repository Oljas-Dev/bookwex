import AboutMeText from "./AboutMeText";
import Achievements from "./Achievements";
import Avatar from "./Avatar";
import Header from "./Header";
import type { TeacherProfile } from "../../types/ui";
import { Gear } from "react-bootstrap-icons";
import { useDashboard } from "../../contexts/useTeacherData";
import { useAuth } from "../../contexts/useAuth";
import useMediaQuery from "@mui/material/useMediaQuery";
import SEO from "../SEO";
import { getAvatarUrl } from "../avatars/features/useAvatar";
import {
  capitalizeAllFirst,
  capitalizeFirst,
  toParamStr,
} from "../../helpers/features";
import dayjs from "dayjs";
import { teacherSchema } from "../../helpers/seo/schemas";

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
    setTitle,
    setSocialLinks,
  } = useDashboard();

  const startYear = teacherData?.experience.start_year;

  const mainSubject = teacherData?.experience?.subjects?.find(
    (subject) => subject.category === "main",
  )?.subject;

  const teacher = {
    name: teacherData?.full_name,
    slug: toParamStr(teacherData?.full_name),
    subject: capitalizeFirst(mainSubject),
    avatar: getAvatarUrl(teacherData?.avatar_url),
    bio: `${capitalizeFirst(teacherData?.subject)} tutor with ${startYear ? dayjs().year() - startYear : 1} years experience.`,
  };

  function handleHero() {
    setActive("heroesDialog");

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
    <>
      <SEO
        title={`${capitalizeAllFirst(teacherData?.full_name)} | ${capitalizeFirst(mainSubject)} Tutor | Bookwex`}
        description={`Book lessons with ${teacherData?.full_name}, a ${mainSubject} tutor on Bookwex.`}
        image={getAvatarUrl(teacherData?.avatar_url)}
        canonical={`https://bookwex.com/teacher/${toParamStr(teacherData?.full_name)}`}
        schema={teacherSchema(teacher)}
      />
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
          <Achievements
            experience={teacherData?.experience}
            teacherId={teacherData?.id}
          />
          <AboutMeText description={teacherData?.descriptions} />
        </div>
        <Avatar teacherData={teacherData} />
      </section>
    </>
  );
}

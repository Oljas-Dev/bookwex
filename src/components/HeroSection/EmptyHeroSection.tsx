import { Gear } from "react-bootstrap-icons";
import { useAuth } from "../../contexts/useAuth";
import Header from "./Header";
import type { TeacherProfile } from "../../types/ui";
import Avatar from "./Avatar";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EmptyHeroSection({
  teacherData,
}: {
  teacherData: TeacherProfile | undefined;
}) {
  const { canEditProfile, isTeacher, isAdmin } = useAuth();

  const tablet = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  function handleOpenDialog() {
    navigate("/welcome-teacher");
  }

  return (
    <>
      {isTeacher || isAdmin ? (
        <section
          id="emptyHeroSection"
          className="grid grid-cols-[70%_30%] w-full bg-jade px-10 py-6 mb-8 relative max-[900px]:flex max-[900px]:flex-col-reverse max-[900px]:items-center max-[900px]:gap-6"
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
              hidden={tablet}
            />
            <h2>Introduce yourself</h2>
            <span>
              <p>Tell students about your experience and teaching style.</p>
            </span>
            {canEditProfile(teacherData?.id) && (
              <button className="max-w-fit" onClick={handleOpenDialog}>
                start teacher onboarding
              </button>
            )}
          </div>
          <Avatar teacherData={teacherData} />
        </section>
      ) : (
        <section
          id="emptyHeroSection"
          className="grid grid-cols-[70%_30%] w-full bg-jade px-10 py-6 mb-8 relative max-[900px]:flex max-[900px]:flex-col-reverse max-[900px]:items-center max-[900px]:gap-6"
        >
          <div className="flex flex-col gap-5">
            <Header
              teachersName={teacherData?.full_name}
              rating={teacherData?.rating_calc}
              hidden={tablet}
            />
            <h2>This page is under construction</h2>
            <span>
              <p>Here comes About Section soon.</p>
            </span>
          </div>
          <Avatar teacherData={teacherData} />
        </section>
      )}
    </>
  );
}

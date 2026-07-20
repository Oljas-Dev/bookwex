import { useNavigate } from "react-router-dom";
import { useProfileById } from "../../../api/features/useProfileById";
import { scrollToSection, toParamStr } from "../../../helpers/features";
import Button from "../../../ui/Button";
import type { User } from "@supabase/supabase-js";

export default function DemoPagePresentation({
  isTeacher,
  user,
}: {
  isTeacher: boolean | undefined;
  user: User | null;
}) {
  const { teacher } = useProfileById("ebd38158-ff5a-4124-a97c-6bba31e59b7e");

  const navigate = useNavigate();

  function sectionRedirect() {
    if (!user) {
      scrollToSection("foundingTutorSection");
    } else {
      navigate("/service-terms");
    }
  }

  return (
    <div className="flex flex-col justify-between py-9 max-[400px]:gap-4">
      <h2>See what your future teaching page could look like.</h2>
      <p>
        Every teacher gets a professional profile with a personal booking link,
        lesson calendar, reviews, and more.
      </p>
      <div className="flex gap-7 max-[400px]:gap-2 max-[400px]:flex-col">
        <Button
          fn={() => navigate(`/teacher/${toParamStr(teacher?.full_name)}`)}
        >
          demo page
        </Button>
        {!isTeacher && <Button fn={sectionRedirect}>become a teacher</Button>}
      </div>
    </div>
  );
}

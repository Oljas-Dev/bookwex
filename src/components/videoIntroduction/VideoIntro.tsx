import AppSection from "../../ui/AppSection";
import SectionsHeader from "../../ui/SectionsHeader";
import { getIntroVideoUrl } from "./features/useIntroVideo";
import { useDashboard } from "../../contexts/useTeacherData";

export default function VideoIntro({ src }: { src: string | undefined }) {
  const { setActive, openDialog, dialogDashboard } = useDashboard();

  const link = getIntroVideoUrl(src);

  function handleDialog() {
    setActive("videoDialog");
    openDialog(dialogDashboard);
  }
  return (
    <AppSection sectionId="videoSection">
      <SectionsHeader
        title="Video introduction"
        options={{ teacherOption: "upload new", studentOption: "" }}
        fnTeacher={handleDialog}
      />
      <video src={link} width="960px" controls />
    </AppSection>
  );
}

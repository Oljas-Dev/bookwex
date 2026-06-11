import { useDashboard } from "../../useTeacherData";
import { useDialog } from "../dashboard-dialog/useDialog";
import { useUpdateHeroSection } from "../../../components/HeroSection/features/hooks/useUpdateHeroSection";

type HeroSectionDialogProps = {
  id: string;
  teacherId: string | undefined;
};

export default function HeroSectionDialog({
  id,
  teacherId,
}: HeroSectionDialogProps) {
  const {
    startYear,
    languages,
    hours,
    title,
    content,
    socialLinks,
    setContent,
    setHours,
    setLanguages,
    setStartYear,
    setTitle,
    setSocialLinks,
  } = useDashboard();

  const { active, dialogDashboard } = useDashboard();
  const { closeDialog } = useDialog();
  const { updateHero } = useUpdateHeroSection();

  if (id !== active) return null;

  // Update socail links on Dashboard
  function updateSocialLink(id: string, value: string) {
    setSocialLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, url: value } : link)),
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateHero({
      teacherId,

      formData: {
        start_year: Number(startYear),

        languages: languages
          .split(",")
          .map((lang) => lang.trim())
          .filter(Boolean),

        hours: Number(hours),

        title,
        content,
        social_links: socialLinks,
      },
    });

    closeDialog(dialogDashboard);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 min-w-150 px-4 py-6 [&_input]:rounded"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="year">When did you start as a teacher</label>
          <input
            type="number"
            value={startYear}
            placeholder="year in format YYYY"
            onChange={(e) => setStartYear(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="languages">Languages</label>
          <input
            id="languages"
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="List languages you speak using coma"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="hoursAsTeacher">Hours taught</label>
          <input
            id="hoursAsTeacher"
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Hours taught"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="teacherTitle">Teacher title</label>
          <input
            id="teacherTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your strong title"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="teacherDescription">About you</label>
          <textarea
            id="teacherDescription"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your description here"
            className="text-[16px] min-h-10"
          />
        </div>
      </div>

      {socialLinks.map((link) => (
        <div key={link.id} className="flex flex-col gap-2">
          <label>{link.platform}</label>

          <input
            value={link.url}
            onChange={(e) => updateSocialLink(link.id, e.target.value)}
          />
        </div>
      ))}

      <button type="submit" className="bg-jade hover:bg-jade-light">
        save changes
      </button>
      <button type="reset" onClick={() => closeDialog(dialogDashboard)}>
        cancel
      </button>
    </form>
  );
}

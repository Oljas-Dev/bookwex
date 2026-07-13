import { useDashboard } from "../../useTeacherData";
import { useDialog } from "../dashboard-dialog/useDialog";
import { useUpdateHeroSection } from "../../../components/HeroSection/features/hooks/useUpdateHeroSection";
import { useState } from "react";
import { normalizeSocialLink } from "../../../helpers/features";

type HeroSectionDialogProps = {
  id: string;
  teacherId: string | undefined;
};

export default function HeroSectionDialog({
  id,
  teacherId,
}: HeroSectionDialogProps) {
  const {
    title,
    content,
    socialLinks,
    setContent,
    setTitle,
    setSocialLinks,
    active,
    dialogDashboard,
  } = useDashboard();

  const { closeDialog } = useDialog();
  const { updateHero } = useUpdateHeroSection();
  const [error, setError] = useState("");

  if (id !== active) return null;

  // Update socail links on Dashboard
  function updateSocialLink(id: string, value: string) {
    setSocialLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, url: value } : link)),
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const normalizedSocialLinks = socialLinks.map((link) => ({
      ...link,
      url: normalizeSocialLink(link.platform, link.url),
    }));

    updateHero({
      teacherId,
      formData: {
        title: title.trim(),
        content: content.trim(),
        social_links: normalizedSocialLinks,
      },
    });

    closeDialog(dialogDashboard);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 min-w-75 px-4 py-6 [&_input]:rounded max-[400px]:min-w-60 max-[400px]:px-2"
    >
      <h2 className="max-[400px]:text-2xl">Let students know you better</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="teacherTitle">Teacher title</label>
          <input
            id="teacherTitle"
            type="text"
            max={100}
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
            maxLength={1000}
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
      <p className="text-red-600">{error}</p>

      <button type="submit" className="bg-jade hover:bg-jade-light">
        save changes
      </button>
      <button type="reset" onClick={() => closeDialog(dialogDashboard)}>
        cancel
      </button>
    </form>
  );
}

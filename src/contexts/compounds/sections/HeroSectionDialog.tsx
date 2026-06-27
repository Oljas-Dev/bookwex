import { useDashboard } from "../../useTeacherData";
import { useDialog } from "../dashboard-dialog/useDialog";
import { useUpdateHeroSection } from "../../../components/HeroSection/features/hooks/useUpdateHeroSection";
import { useState } from "react";
import {
  isValidYear,
  normalizeSocialLink,
  validateHeroSection,
} from "../../../helpers/features";

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
  const [error, setError] = useState("");
  const [hoursError, setHoursError] = useState(true);

  if (id !== active) return null;

  // Update socail links on Dashboard
  function updateSocialLink(id: string, value: string) {
    setSocialLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, url: value } : link)),
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validateHeroSection({
      startYear: startYear ?? "",
      languages: languages ?? "",
      hours: hours ?? "",
      title: title ?? "",
      content: content ?? "",
    });

    if (!validation.valid) {
      setError(validation.message);
      setHoursError(validation.message.includes("Hours"));
      return;
    }

    setError("");
    setHoursError(false);

    const normalizedSocialLinks = socialLinks.map((link) => ({
      ...link,
      url: normalizeSocialLink(link.platform, link.url),
    }));

    updateHero({
      teacherId,
      formData: {
        start_year: Number(startYear),
        languages: languages
          .split(",")
          .map((lang) => lang.trim())
          .filter(Boolean),
        hours: validation.hoursNumber,
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
      className="flex flex-col gap-6 min-w-75 px-4 py-6 [&_input]:rounded"
    >
      <h2>Let students know you better</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="year">When did you start as a teacher</label>
          <input
            type="number"
            value={startYear}
            placeholder="year in format YYYY"
            onChange={(e) => setStartYear(e.target.value)}
            className={`${!isValidYear(startYear) && "border-red-600"}`}
          />
          <p className="text-jet/50">
            {isValidYear(startYear) ? "" : "Choose year between 1900 and 2026"}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="languages">
            {languages
              ? "Separate languages you speak using coma"
              : "Languages"}
          </label>
          <input
            id="languages"
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="Separate languages you speak using coma"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="hoursAsTeacher">Hours taught</label>
          <input
            id="hoursAsTeacher"
            type="number"
            min={0}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Hours taught"
          />
          <p className="text-jet/50">
            {hoursError && "Should be positive number"}
          </p>
        </div>

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

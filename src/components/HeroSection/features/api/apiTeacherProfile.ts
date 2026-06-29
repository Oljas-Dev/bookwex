import { supabase } from "../../../../api/supabase/supabase";
import type { HeroSectionFormData, TeacherLesson } from "../../../../types/ui";

export async function updateHeroSection(
  teacherId: string | undefined,
  formData: HeroSectionFormData,
) {
  if (!teacherId) throw new Error("Teacher id is missing");

  const experiencePromise = supabase.from("teacher_experience").upsert(
    {
      teacher_id: teacherId,
      start_year: formData.start_year,
      languages: formData.languages,
      hours: formData.hours,
    },
    {
      onConflict: "teacher_id",
    },
  );

  const descriptionPromise = supabase.from("teacher_descriptions").upsert(
    {
      teacher_id: teacherId,
      title: formData.title,
      content: formData.content,
    },
    {
      onConflict: "teacher_id",
    },
  );

  const socialPromises = formData.social_links.map((link) =>
    supabase.from("teacher_social_links").upsert({
      id: link.id,
      teacher_id: teacherId,
      platform: link.platform,
      url: link.url,
    }),
  );

  const results = await Promise.all([
    experiencePromise,
    descriptionPromise,
    ...socialPromises,
  ]);

  const failed = results.find((r) => r.error);

  if (failed?.error) {
    throw failed.error;
  }

  return true;
}

export async function updateTeacherLessons(
  lessons: TeacherLesson[] | undefined,
) {
  if (!lessons?.length) return true;

  const { error } = await supabase.from("teacher_lessons").upsert(lessons);

  if (error) throw error;

  return true;
}

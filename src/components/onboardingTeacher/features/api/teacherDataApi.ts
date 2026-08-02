import toast from "react-hot-toast";
import { supabase } from "../../../../api/supabase/supabase";
import type { Languages } from "../../TeacherLanguages";
import type { Subjects } from "../../Subjects";
import type { OnboardingDescription } from "../../Description";

export async function updateStartYear(
  teacherId: string | undefined,
  startYear: string | undefined,
) {
  const { error } = await supabase.from("teacher_experience").upsert(
    {
      teacher_id: teacherId,
      start_year: startYear,
    },
    {
      onConflict: "teacher_id",
    },
  );

  if (error) {
    toast.error(error.message);
    console.error(error.message);
    
    throw error;
  }
}

export async function updateLanguages(
  teacherId: string | undefined,
  languages: Languages[],
) {
  const { error } = await supabase.from("teacher_experience").upsert(
    {
      teacher_id: teacherId,
      languages: languages,
    },
    {
      onConflict: "teacher_id",
    },
  );

  if (error) {
    toast.error(error.message);
    throw error;
  }
}

export async function updateSubjects(
  teacherId: string | undefined,
  subjects: Subjects[],
) {
  const { error } = await supabase.from("teacher_experience").upsert(
    {
      teacher_id: teacherId,
      subjects: subjects,
    },
    {
      onConflict: "teacher_id",
    },
  );

  if (error) {
    toast.error(error.message);
    throw error;
  }
}

export async function updateDescriptions(
  teacherId: string | undefined,
  descriptions: OnboardingDescription,
) {
  const { error } = await supabase.from("teacher_descriptions").upsert(
    {
      teacher_id: teacherId,
      title: descriptions.title,
      content: descriptions.content,
    },
    {
      onConflict: "teacher_id",
    },
  );

  if (error) {
    toast.error(error.message);
    throw error;
  }
}

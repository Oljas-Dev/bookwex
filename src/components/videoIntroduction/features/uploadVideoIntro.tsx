import { supabase } from "../../../api/supabase/supabase";

export async function uploadVideoIntro(file: File, userId: string) {
  const fileExt = file.name.split(".").pop() || "mp4";
  const filePath = `public/${userId}/video-intro.${fileExt}`;

  const { error } = await supabase.storage
    .from("intro-videos")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("intro-videos").getPublicUrl(filePath);

  return {
    filePath,
    publicUrl: data.publicUrl,
  };
}

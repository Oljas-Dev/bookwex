import { supabase } from "../../../api/supabase/supabase";

export async function uploadVideoIntro(file: File, userId: string) {
  const filePath = `public/${userId}/video-intro`;

  const { error } = await supabase.storage
    .from("intro-videos")
    .upload(filePath, file, {
      upsert: true,
      contentType: file.type,
    });

  if (error) throw error;

  const { data } = supabase.storage.from("intro-videos").getPublicUrl(filePath);

  return {
    filePath,
    publicUrl: data.publicUrl,
  };
}

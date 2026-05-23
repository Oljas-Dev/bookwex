import { supabase } from "../../../api/supabase/supabase";
import { generateImgId } from "../../../helpers/features";

export async function uploadAvatarFile(file: File, userId: string) {
  const imgId = generateImgId();
  const fileExt = file.name.split(".").pop() || "png";
  const filePath = `public/${userId}/avatar-${imgId}.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return {
    filePath,
    publicUrl: data.publicUrl,
  };
}

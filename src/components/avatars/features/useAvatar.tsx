import { supabase } from "../../../api/supabase/supabase";

export function getAvatarUrl(path?: string | null) {
  if (!path) return null;

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);

  return data.publicUrl;
}

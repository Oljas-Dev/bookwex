import { supabase } from "../../../api/supabase/supabase";

export function getAvatarUrl(path?: string | undefined) {
  if (!path) return undefined;

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);

  return data.publicUrl;
}

import { supabase } from "../../../api/supabase/supabase";

export function getIntroVideoUrl(path?: string | undefined) {
  if (!path) return;

  const { data } = supabase.storage.from("intro-videos").getPublicUrl(path);

  return data.publicUrl;
}

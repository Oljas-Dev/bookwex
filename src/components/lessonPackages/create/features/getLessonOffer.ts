import { supabase } from "../../../../api/supabase/supabase";

export async function getLessonOffer(lessonOfferId: string, teacherId: string) {
    const { data, error } = await supabase
        .from("teacher_lessons")
        .select("title")
        .eq("id", lessonOfferId)
        .eq("teacher_id", teacherId)
        .maybeSingle();

    if (error ){
        console.error(error.message);
        throw error;
    }

    return data;
}
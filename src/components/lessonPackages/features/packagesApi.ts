import { supabase } from "../../../api/supabase/supabase";

export async function getLessonTypesApi(teacherId: string) {
    const { data, error } = await supabase
        .from("teacher_lessons")
        .select(
        `
        id,
        title,
        goal,
        method,
        result,
        price
        `,
        )
        .eq("teacher_id", teacherId);

        if(error) {
            console.error(error.message);
            throw error;
        };

        return data;
}
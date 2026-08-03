import { supabase } from "../../../../api/supabase/supabase";

export async function getAdminTeachers(type: string[]) {
    
    const {data, error } = await supabase
    .from('profiles')
    .select("*")
    .eq('role', 'teacher')
    .in('teacher_status', type);

    if (error) {
        console.error(error.message);
        throw error;
    }

    return data;
}
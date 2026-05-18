import { useEffect, useState, type ReactNode } from "react";
import { UsersContext } from "./AuthContextData";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../api/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
// import useProfile from "../api/features/useProfile";

export function AuthProvider({ children }: { children: ReactNode }) {
  // AUTH STATE
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // const { student, user } = useStudent();

  // INITIAL SESSION + LISTENER
  useEffect(() => {
    // Get existing session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setAuthLoading(false);
    });

    // Listen for login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // PROFILE QUERY
  const { data: profile, isPending: profileLoading } = useQuery({
    queryKey: ["profile", user?.id],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();

      if (error) throw error;

      return data;
    },

    enabled: !!user,
  });

  // LOADING
  const loading = authLoading || profileLoading;

  // FLAGS
  // User is authenticated
  const isAuthenticated = !!user;
  // const isAuthenticated = user?.role === "authenticated";

  // User logged in as a student
  // const isStudent = student?.id === user?.id && student?.role === "student";
  const isStudent = profile?.role === "student";

  // User logged in as a teacher
  // const isTeacher = student?.id === user?.id && student?.role === "teacher";
  const isTeacher = profile?.role === "teacher";

  // console.log(user);

  // console.log("student: ", isStudent, "teacher :", isTeacher);

  return (
    <UsersContext.Provider
      value={{
        user,
        profile,
        loading,
        isAuthenticated,
        isStudent,
        isTeacher,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

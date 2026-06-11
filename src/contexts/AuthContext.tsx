import { useEffect, useState, type ReactNode } from "react";
import { UsersContext } from "./AuthContextData";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../api/supabase/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toNormalStr } from "../helpers/features";

export function AuthProvider({ children }: { children: ReactNode }) {
  // AUTH STATE
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Current teacher id state for main page data loading
  const [currentTeacherId, setCurrentTeacherId] = useState("");

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

  // All public profiles query
  const { data: profiles, isPending: profilesLoading } = useQuery({
    queryKey: ["profiles", user?.id],

    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*");

      if (error) throw error;

      return data;
    },
  });

  const updateTimezone = useMutation({
    mutationFn: async (timezone: string) => {
      const { error } = await supabase
        .from("profiles")
        .update({ timezone })
        .eq("id", user!.id);

      if (error) throw error;
    },
  });

  useEffect(() => {
    if (!profile) return;

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (profile.timezone !== timezone) {
      updateTimezone.mutate(timezone);
    }
  }, [profile, updateTimezone]);

  const currentTeacher = (teacherName: string | undefined) => {
    return profiles?.find(
      (teacher) => toNormalStr(teacher.full_name) === toNormalStr(teacherName),
    );
  };

  // LOADING
  const loading = authLoading || profileLoading || profilesLoading;

  // FLAGS
  // User is authenticated
  const isAuthenticated = !!user;

  // User logged in as a student
  const isStudent = profile?.role === "student";

  // User logged in as a teacher
  const isTeacher = profile?.role === "teacher";

  // console.log(user);

  return (
    <UsersContext.Provider
      value={{
        user,
        currentTeacherId,
        setCurrentTeacherId,
        profile,
        profiles,
        loading,
        isAuthenticated,
        isStudent,
        isTeacher,
        currentTeacher,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

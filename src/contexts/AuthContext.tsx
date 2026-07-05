import { useEffect, useState, type ReactNode } from "react";
import { UsersContext } from "./AuthContextData";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../api/supabase/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

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
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const userId = user?.id;

  // PROFILE QUERY
  const { data: profile, isPending: profileLoading } = useQuery({
    queryKey: ["profile", userId],
    enabled: !!userId,

    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      return data;
    },
  });

  // All public profiles query
  const { data: profiles } = useQuery({
    queryKey: ["profiles"],

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

  function canEditProfile(profileId: string | undefined) {
    return user?.id === profileId;
  }

  // LOADING
  const loading = authLoading || profileLoading;

  // useEffect(() => {
  //   console.log({
  //     authLoading,
  //     profileLoading,

  //     loading,
  //     user,
  //   });
  // }, [authLoading, profileLoading, loading, user]);

  // FLAGS
  // User is authenticated
  const isAuthenticated = !!user;

  // User logged in as a student
  const isStudent = profile?.role === "student";

  // User logged in as a teacher
  const isTeacher = profile?.role === "teacher";

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
        canEditProfile,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

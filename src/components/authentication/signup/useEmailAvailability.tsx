import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { isEmailAvailable } from "./isNameAvailable";

export function useEmailAvailability(email: string) {
  const [debouncedEmail, setDebouncedEmail] = useState(email);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedEmail(email.trim().toLowerCase());
    }, 400);

    return () => clearTimeout(timeout);
  }, [email]);

  const query = useQuery({
    queryKey: ["email-availability", debouncedEmail],
    queryFn: () => isEmailAvailable(debouncedEmail),
    enabled: !!debouncedEmail && debouncedEmail.includes("@"),
    staleTime: 1000 * 60 * 5,
  });

  return {
    isAvailable: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

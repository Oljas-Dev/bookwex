import { useMemo } from "react";
import { getPasswordStrength } from "./getPasswordStrength";
import { getPasswordLabel } from "./getPasswordLabel";

export function usePasswordStrength(password: string) {
  return useMemo(() => {
    const score = getPasswordStrength(password);
    return {
      score,
      label: getPasswordLabel(score),
    };
  }, [password]);
}

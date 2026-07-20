// import { useQuery } from "@tanstack/react-query";
// import { isEmailAvailable, isNameAvailable } from "../isNameAvailable";

// export function useCheckName(name: string) {
//   return useQuery({
//     queryKey: ["name-availability", name],
//     queryFn: () => isNameAvailable(name),
//     enabled: name.length > 2,
//   });
// }

// export function useCheckEmail(email: string) {
//   return useQuery({
//     queryKey: ["email-availability", email],
//     queryFn: () => isEmailAvailable(email),
//     enabled: email.includes("@"),
//   });
// }

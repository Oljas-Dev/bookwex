import { useQuery } from "@tanstack/react-query";
import { getAdminMessages } from "./getAdminMessages";
import { mapAdminMessage } from "../../../mappers/mapAdminMessage";

export function useAdminMessages() {
  return useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const messages = await getAdminMessages();

      return messages.map(mapAdminMessage);
    },
  });
}

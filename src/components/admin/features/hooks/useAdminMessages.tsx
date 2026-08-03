import { useQuery } from "@tanstack/react-query";
import { mapAdminMessage } from "../../../../mappers/mapAdminMessage";
import { getAdminMessages } from "../api/getAdminMessages";

export function useAdminMessages() {
  return useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const messages = await getAdminMessages();

      return messages.map(mapAdminMessage);
    },
  });
}

import type { AdminCategory, AdminStatus } from "./db";

interface AdminProfile {
  full_name: string;
  avatar_url: string | undefined;
}

export interface AdminMessage {
  id: string;
  createdAt: Date;
  title: string;
  message: string;
  category: AdminCategory;
  status?: AdminStatus;
  userId?: string | undefined;
  isResolved?: boolean;
  adminMessage: string | null;

  profiles: AdminProfile[];
}

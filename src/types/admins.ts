import type { AdminCategory, AdminStatus } from "./db";

export interface AdminMessage {
  id: string;
  createdAt: Date;
  title: string;
  message: string;
  category: AdminCategory;
  status?: AdminStatus;
  userId?: string | undefined;
  isResolved?: boolean;
  adminMessage: string;
}

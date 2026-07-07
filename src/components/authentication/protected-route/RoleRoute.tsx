import type { ReactNode } from "react";
import { useAuth } from "../../../contexts/useAuth";
import { Navigate } from "react-router-dom";

export default function RoleRoute({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: string[];
}) {
  const { user, profile, loading } = useAuth();

  if (loading) return <p>Checking user...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!profile || !allowedRoles.includes(profile.role)) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

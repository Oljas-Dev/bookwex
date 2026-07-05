import type { ReactNode } from "react";
import { useAuth } from "../../../contexts/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p>checking user...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

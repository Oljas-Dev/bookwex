import { Outlet } from "react-router-dom";
import AdminNav from "./ui/AdminNav";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <AdminNav />
      <Outlet />
    </div>
  );
}

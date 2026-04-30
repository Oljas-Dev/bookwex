import { Outlet } from "react-router-dom";

export default function Applayout() {
  return (
    <div className="text-jet flex flex-col place-items-center min-h-screen bg-secondary-bg w-225 pt-4">
      <Outlet />
    </div>
  );
}

// justify-center

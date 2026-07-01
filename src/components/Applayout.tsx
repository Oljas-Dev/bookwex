import { Outlet } from "react-router-dom";

export default function Applayout() {
  return (
    <div className="text-jet flex flex-col place-items-center min-h-screen bg-secondary-bg max-w-300 pt-4 max-lg:w-220 ">
      <Outlet />
    </div>
  );
}

// justify-center

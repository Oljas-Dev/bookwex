import { Outlet } from "react-router-dom";

export default function Applayout() {
  return (
    <div className="text-jet flex flex-col min-h-screen bg-secondary-bg w-330 pt-4 max-[1400px]:mx-[10%] max-[1400px]:w-full ">
      <Outlet />
    </div>
  );
}

// justify-center max-lg:w-220

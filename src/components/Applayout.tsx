import { Outlet } from "react-router-dom";
import SupportForm from "./support/SupportForm";
import { useState } from "react";
import { useAuth } from "../contexts/useAuth";

export default function Applayout() {
  const { isTeacher } = useAuth();

  const [showFeedback, setShowFeedback] = useState(false);
  return (
    <div className="text-jet flex flex-col min-h-screen bg-secondary-bg w-330  max-[1400px]:mx-[10%] max-[1400px]:w-full pb-5 relative">
      <Outlet />
      {isTeacher && <SupportForm close={setShowFeedback} show={showFeedback} />}
    </div>
  );
}

// justify-center max-lg:w-220

import { Outlet } from "react-router-dom";

export default function OnboardingLayout() {
  return (
    <section className="flex justify-center w-full min-h-screen">
      <article className="text-jet flex flex-col gap-4 items-center min-h-screen bg-secondary-bg w-280 pb-5 max-[1200px]:w-full">
        <Outlet />
      </article>
    </section>
  );
}

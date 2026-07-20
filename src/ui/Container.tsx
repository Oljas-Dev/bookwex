import type { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <section className="flex justify-center w-full min-h-screen">
      <article className="text-jet flex flex-col gap-4 items-center min-h-screen bg-secondary-bg w-280 pb-5 max-[1200px]:w-full">
        {children}
      </article>
    </section>
  );
}

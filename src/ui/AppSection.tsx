import type { ReactNode } from "react";

export default function AppSection({
  sectionId,
  children,
}: {
  sectionId: string;
  children: ReactNode;
}) {
  return (
    <section
      id={sectionId}
      className="flex flex-col gap-4 w-full px-10 py-6 mb-8"
    >
      {children}
    </section>
  );
}

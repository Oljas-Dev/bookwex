import type { ReactNode } from "react";

export default function CardsSubSection({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <article
      id={id}
      className="flex flex-col gap-11 text-center [&_p]:text-lg max-[400px]:[&_p]:text-sm"
    >
      <h2>{title}</h2>
      {children}
    </article>
  );
}

import type { ReactNode } from "react";

interface LessonCardsContainerProps {
  h2: string;
  children: ReactNode;
}

export default function LessonCardsContainer({
  h2,
  children,
}: LessonCardsContainerProps) {
  return (
    <article className="flex flex-col gap-3">
      <h2>{h2}</h2>
      {children}
    </article>
  );
}

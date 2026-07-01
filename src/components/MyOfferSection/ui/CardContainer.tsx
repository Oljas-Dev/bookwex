import type { ReactNode } from "react";

export default function CardContainer({
  styles,
  children,
}: {
  styles?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`${styles} flex flex-col rounded-2xl overflow-hidden shadow-[3px_3px_3px_var(--shadow-dark-card),-3px_-3px_3px_var(--shadow-light)] border-t border-l border-t-stroke-light border-l-stroke-light `}
    >
      {children}
    </div>
  );
}

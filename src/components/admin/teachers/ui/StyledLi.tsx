import type { ReactNode } from "react";

export default function StyledLi({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <li
      onClick={onClick}
      className="text-xl px-4 py-1 border-2 border-jet/20 rounded-xl cursor-pointer hover:border-b-jet hover:border-r-jet hover:border-l-jade-light hover:border-t-jade-light hover:shadow-[3px_3px_3px_var(--shadow-dark-card),-3px_-3px_3px_var(--shadow-light)] active:shadow-none"
    >
      {children}
    </li>
  );
}

import type { ReactNode } from "react";

export default function HoverInfo({
  translate,
  text,
  children,
}: {
  translate: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <div className="group relative flex flex-col items-center pt-8">
      <p
        className={`absolute top-0 opacity-0 -translate-y-6 transition-all duration-300 group-hover:opacity-100 group-hover:${translate}`}
      >
        {text}
      </p>
      {children}
    </div>
  );
}

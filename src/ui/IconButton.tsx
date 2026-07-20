import type { ReactNode } from "react";

type ButtonType = "button" | "submit" | "reset" | undefined;

export default function IconButton({
  type = "button",
  fn,
  styles,
  children,
}: {
  type?: ButtonType;
  fn?: () => void;
  styles?: string;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      className={`${styles} text-jet bg-transparent border-none outline-none rounded-2xl max-[400px]:text-sm`}
      onClick={fn}
    >
      {children}
    </button>
  );
}

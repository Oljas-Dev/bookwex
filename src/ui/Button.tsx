import type { ReactNode } from "react";

type ButtonType = "button" | "submit" | "reset" | undefined;

export default function Button({
  type = "button",
  fn,
  styles,
  disabled,
  borderColor = "border-jet",
  children,
}: {
  type?: ButtonType;
  fn?: () => void;
  styles?: string;
  disabled?: boolean;
  borderColor?: string;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      className={`${styles} ${borderColor} bg-transparent border-5 rounded-2xl shadow-[4px_4px_8px_var(--shadow-dark-card)] enabled:hover:border-amber-100 enabled:hover:bg-jet enabled:hover:text-jade active:shadow-none active:border-jade transition-colors group max-[400px]:text-sm disabled:border-jet/30 disabled:shadow-none disabled:cursor-not-allowed`}
      onClick={fn}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

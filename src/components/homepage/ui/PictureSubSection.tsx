import type { ReactNode } from "react";

export default function SectionWithPicture({
  img,
  alt,
  children,
  isLeftSide,
  styles,
}: {
  img: string;
  alt: string;
  children: ReactNode;
  isLeftSide: boolean;
  styles?: string;
}) {
  return (
    <article
      className={`flex bg-jade w-full [&_p]:text-xl py-2.5 ${isLeftSide ? "pr-2.5 pl-18" : "flex-row-reverse pr-18 pl-2.5"} ${styles} max-[900px]:flex-col-reverse max-[900px]:px-4 max-[900px]:items-center max-[400px]:px-2 max-[400px]:[&_p]:text-sm`}
    >
      {children}
      <img
        src={img}
        alt={alt}
        className="max-[900px]:w-120 max-[600px]:w-auto max-[400px]:w-50"
      />
    </article>
  );
}

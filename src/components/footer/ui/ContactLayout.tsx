import type { ReactNode } from "react";
import IconButton from "../../../ui/IconButton";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function ContactLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  return (
    <article className="flex flex-col justify-baseline gap-2 w-full px-14 py-10 [&_p]:text-lg max-[400px]:px-4">
      <IconButton fn={() => navigate(-1)} styles="pl-0">
        <div className="px-3 py-1 bg-jet/20 w-fit rounded-2xl hover:bg-jet/30">
          <ArrowLeft size={32} />
        </div>
      </IconButton>
      {children}
    </article>
  );
}

import LegalDocument from "./ui/LegalDocument";
import { foundingTutorsData } from "./features/foundingTutors";
import Button from "../../ui/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import HoverInfo from "../../ui/HoverInfo";
import { termsOfServiceData } from "./features/termOfService";
import { useRef, useState } from "react";

export default function FoundingTutorsProgram() {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [searchParams] = useSearchParams();

  const termsRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const isFoundingTutor = searchParams.get("program") === "founder";

  function tutorChoice(tutorType: string) {
    localStorage.setItem("tutor_type", tutorType);
    navigate(
      tutorType === "founder"
        ? "/auth/signup-teacher?program=founder"
        : "/auth/signup-teacher",
    );
  }

  function handleScroll() {
    if (!termsRef.current || hasScrolledToBottom) return;

    const { scrollTop, scrollHeight, clientHeight } = termsRef.current;

    // 5px tolerance for rounding differences
    const reachedBottom = scrollTop + clientHeight >= scrollHeight - 5;

    if (reachedBottom) {
      setHasScrolledToBottom(true);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-[80%] h-screen bg-jade px-6 py-4 border-2 border-jet rounded-2xl mt-6 shadow-[6px_8px_8px_var(--shadow-dark-card)] max-[700px]:w-[96%] max-[600px]:px-2">
      <div
        ref={termsRef}
        onScroll={handleScroll}
        className="w-[90%] px-4 py-2 overflow-auto max-[600px]:w-full"
      >
        <LegalDocument
          legalData={isFoundingTutor ? foundingTutorsData : termsOfServiceData}
          styles="max-[500px]:px-2"
        />
      </div>
      <div className="flex justify-center gap-3 text-center max-[500px]:flex-wrap max-[500px]:gap-y-0">
        {isFoundingTutor ? (
          <>
            <HoverInfo
              translate="group-hover:-translate-y-3"
              text="back to homepage"
            >
              <Button fn={() => navigate("/")}>back</Button>
            </HoverInfo>

            <HoverInfo
              translate="group-hover:translate-y-1"
              text="with privileges"
            >
              <Button
                fn={() => tutorChoice("founder")}
                disabled={!hasScrolledToBottom}
              >
                continue as founder
              </Button>
            </HoverInfo>

            <HoverInfo
              translate="group-hover:translate-y-1"
              text="without privileges"
            >
              <Button
                fn={() => tutorChoice("standard")}
                disabled={!hasScrolledToBottom}
              >
                become tutor
              </Button>
            </HoverInfo>
          </>
        ) : (
          <>
            <Button fn={() => navigate("/")}>back</Button>
            <Button
              fn={() => tutorChoice("standard")}
              disabled={!hasScrolledToBottom}
            >
              become tutor
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

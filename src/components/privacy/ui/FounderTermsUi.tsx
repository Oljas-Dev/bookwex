import { useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";
import HoverInfo from "../../../ui/HoverInfo";

type tutorType = "founder" | "standard";

export default function FounderTermsUi({
  tutorChoice,
  scrollCheck,
  isTutor,
}: {
  tutorChoice: (tutorType: tutorType) => void;
  scrollCheck: boolean;
  isTutor: boolean;
}) {
  const navigate = useNavigate();
  return (
    <>
      <HoverInfo translate="group-hover:-translate-y-3" text="back to homepage">
        <Button fn={() => navigate("/")}>back</Button>
      </HoverInfo>

      <HoverInfo translate="group-hover:translate-y-1" text="with privileges">
        <Button fn={() => tutorChoice("founder")} disabled={!scrollCheck}>
          continue as founder
        </Button>
      </HoverInfo>

      <HoverInfo
        translate="group-hover:translate-y-1"
        text="without privileges"
      >
        <Button
          fn={() => tutorChoice("standard")}
          disabled={!scrollCheck || isTutor}
        >
          {isTutor ? "already tutor" : "become tutor"}
        </Button>
      </HoverInfo>
    </>
  );
}

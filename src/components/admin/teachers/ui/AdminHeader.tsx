import type { Dispatch, SetStateAction } from "react";
import SmallSpinner from "../../../../ui/Spinner";
import StyledLi from "./StyledLi";

export default function AdminHeader({
  teachersTotal,
  isPending,
  setTeacherType,
}: {
  teachersTotal: string | undefined;
  isPending: boolean;
  setTeacherType: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2>Teachers summary</h2>
        <div className="flex gap-1 text-2xl">
          total: {isPending ? <SmallSpinner /> : teachersTotal}
        </div>
      </div>

      <div>
        <ul className="flex items-center flex-wrap gap-4  ">
          <StyledLi
            onClick={() => setTeacherType(["standard", "founder", "test_user"])}
          >
            all
          </StyledLi>
          <StyledLi onClick={() => setTeacherType(["standard"])}>
            standard
          </StyledLi>
          <StyledLi onClick={() => setTeacherType(["founder"])}>
            founders
          </StyledLi>
          <StyledLi onClick={() => setTeacherType(["test_user"])}>
            test users
          </StyledLi>
        </ul>
      </div>
    </header>
  );
}

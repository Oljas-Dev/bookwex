import { Gear } from "react-bootstrap-icons";
import { capitalizeAllFirst } from "../../../helpers/features";
import type { Subjects } from "../../onboardingTeacher/Subjects";

export default function SubjectCard({
  subjects,
  teacherId,
  canEditProfile,
  openLanguagesDialog,
}: {
  subjects: Subjects[] | undefined;
  teacherId: string | undefined;
  canEditProfile: (profileId: string | undefined) => boolean;
  openLanguagesDialog: (id: string) => void;
}) {
  return (
    <div className="w-45 h-50 flex flex-col bg-jade text-center rounded-xl overflow-hidden relative shadow-[3px_3px_3px_var(--shadow-dark-card),-3px_-3px_3px_var(--shadow-light)] border-t border-l border-t-stroke-light border-l-stroke-light max-[700px]:w-35 max-[700px]:h-auto max-[550px]:hidden">
      <div className="flex-1 flex-center px-2 py-3 max-[700px]:p-2">
        <ul className="flex flex-col justify-center gap-2">
          {subjects?.map((subject: Subjects) => {
            return (
              <li
                className="border-b border-jet last:border-0"
                key={subject.subject}
              >
                <p className="text-xl max-[700px]:text-sm">
                  {capitalizeAllFirst(subject.subject)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="h-10 flex-center bg-peach border-t-3 border-jade-light max-[700px]:p-2 max-[700px]:h-auto">
        <p className="max-[700px]:p-2 max-[700px]:text-xs">
          <strong>teaching you</strong>
        </p>
      </div>

      {canEditProfile(teacherId) && (
        <Gear
          size={20}
          className="absolute top-2 right-2 cursor-pointer hover:rotate-45"
          onClick={() => openLanguagesDialog("editSubjects")}
        />
      )}
    </div>
  );
}

import { Gear } from "react-bootstrap-icons";
import { capitalizeAllFirst } from "../../../helpers/features";
import type { Languages } from "../../onboardingTeacher/TeacherLanguages";

export default function LanguageCard({
  languages,
  teacherId,
  canEditProfile,
  openLanguagesDialog,
}: {
  languages: Languages[] | undefined;
  teacherId: string | undefined;
  canEditProfile: (profileId: string | undefined) => boolean;
  openLanguagesDialog: (id: string) => void;
}) {
  return (
    <div className="w-45 h-50 flex flex-col bg-jade text-center rounded-xl overflow-hidden relative shadow-[3px_3px_3px_var(--shadow-dark-card),-3px_-3px_3px_var(--shadow-light)] border-t border-l border-t-stroke-light border-l-stroke-light max-[600px]:w-25 max-[600px]:h-auto max-[450px]:hidden">
      <div className="flex-1 flex-center px-2 pt-6 overflow-auto max-[600px]:p-2">
        {languages?.map((language: Languages) => {
          return (
            <div
              className="flex justify-center items-center gap-2"
              key={language.language}
            >
              <p className="text-[14px] max-[600px]:text-sm">
                {capitalizeAllFirst(language.language)}:
              </p>
              <p className="text-xl max-[600px]:text-sm">
                {(language.level === "native" && "●●●●") ||
                  (language.level === "fluent" && "●●●○") ||
                  (language.level === "intermediate" && "●●○○") ||
                  (language.level === "beginner" && "●○○○")}
              </p>
            </div>
          );
        })}
      </div>
      <div className="h-10 flex-center bg-peach border-t-3 border-jade-light max-[600px]:p-2 max-[600px]:h-auto">
        <p className="max-[600px]:p-2">
          <strong>languages spoken</strong>
        </p>
      </div>

      {canEditProfile(teacherId) && (
        <Gear
          size={20}
          className="absolute top-2 right-2 cursor-pointer hover:rotate-45"
          onClick={() => openLanguagesDialog("editLanguages")}
        />
      )}
    </div>
  );
}

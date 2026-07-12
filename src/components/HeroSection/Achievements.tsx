import dayjs from "dayjs";
import type { TeacherExperience } from "../../types/ui";
import AchievementsCard from "./ui/AchievementsCard";
import type { Languages } from "../onboardingTeacher/TeacherLanguages";

export default function Achievements({
  experience,
}: {
  experience: TeacherExperience | undefined;
}) {
  const startYear = experience?.start_year;

  const yearsDiff = startYear ? dayjs().year() - startYear : 0;

  const years = `${yearsDiff}`;
  const hoursTaught = `${experience?.hours}`;

  return (
    <div className="flex justify-between px-2">
      <AchievementsCard value={`${years}+`} title="years of experience" />
      <div className="w-40 h-45 flex flex-col bg-jade text-center rounded-xl overflow-hidden shadow-[3px_3px_3px_var(--shadow-dark-card),-3px_-3px_3px_var(--shadow-light)] border-t border-l border-t-stroke-light border-l-stroke-light max-[600px]:w-25 max-[600px]:h-auto max-[450px]:hidden">
        <div className="flex-1 flex-center max-[600px]:p-2">
          {experience?.languages.map((language: Languages) => {
            return (
              <div key={language.language}>
                <p className="text-2xl max-[600px]:text-xl">
                  {language.language}
                </p>
                <p className="text-2xl max-[600px]:text-xl">{language.level}</p>
              </div>
            );
          })}
        </div>
        <div className="h-10 flex-center bg-peach border-t-3 border-jade-light max-[600px]:p-2 max-[600px]:h-auto">
          <p className="max-[600px]:p-2">
            <strong>languages spoken</strong>
          </p>
        </div>
      </div>
      <AchievementsCard
        value={`${hoursTaught}+`}
        title="hours taught"
        smallText={true}
      />
    </div>
  );
}

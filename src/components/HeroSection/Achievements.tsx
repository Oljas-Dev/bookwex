import dayjs from "dayjs";
import type { TeacherExperience } from "../../types/ui";
import AchievementsCard from "./ui/AchievementsCard";

export default function Achievements({
  experience,
}: {
  experience: TeacherExperience | undefined;
}) {
  const startYear = experience?.start_year;

  const yearsDiff = startYear ? dayjs().year() - startYear : 0;

  const years = `${yearsDiff}`;
  const languagesSpoken = `${experience?.languages.length}`;
  const hoursTaught = `${experience?.hours}`;
  return (
    <div className="flex justify-between px-2">
      <AchievementsCard value={`${years}+`} title="years of experience" />
      <AchievementsCard value={languagesSpoken} title="languages spoken" />
      <AchievementsCard
        value={`${hoursTaught}+`}
        title="hours taught"
        smallText={true}
      />
    </div>
  );
}

// import DisplayLessonInfo from "./DisplayLessonInfo";
// import UserDisplay from "./UserDiplay";
// import type { LessonCard } from "../../../../types/ui";

// export type StudentCard =
//   | {
//       fullName?: string;
//       avatarUrl?: string;
//     }
//   | undefined;

// export default function StudentLessonGroup({ lesson }: { lesson: LessonCard }) {
//   const user: StudentCard = {
//     fullName: teacher?.full_name,
//     avatarUrl: teacher?.avatar_url,
//   };

//   console.log(user);

//   return (
//     <div className="flex gap-6">
//       <UserDisplay user={user} title="Teacher:" />

//       <DisplayLessonInfo
//         duration={lesson.duration}
//         startTime={lesson.startTime}
//       />
//     </div>
//   );
// }

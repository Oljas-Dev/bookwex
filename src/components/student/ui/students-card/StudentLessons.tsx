// import type { JSX } from "@emotion/react/jsx-runtime";
// import CardFunctionality from "./CardFunctionality";
// import type { LessonCard } from "../../../../types/ui";
// import StudentLessonGroup from "./StudentLessonGroup";
// import { useAuth } from "../../../../contexts/useAuth";

// export default function StudentLessons({
//   lessons,
// }: {
//   lessons: LessonCard[] | undefined;
// }) {
//   const { user } = useAuth();

//   const lessonsJSX: JSX.Element[] = [];

//   lessons?.forEach((lesson, i) => {
//     if (lesson.teacherId === user?.id) return null;
//     lessonsJSX.push(
//       <div
//         className="flex justify-between items-center flex-wrap px-4 py-2 bg-jade rounded"
//         key={i}
//       >
//         <StudentLessonGroup lesson={lesson} />
//         <CardFunctionality lesson={lesson} />
//       </div>,
//     );
//   });

//   return <div className="flex flex-col gap-3">{lessonsJSX}</div>;
// }

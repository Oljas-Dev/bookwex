import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import PackagesHeader from "./ui/PackagesHeader";
import TeacherPackages from "./ui/TeacherPackages";
import useLessonTypes from "./hooks/useLessonTypes";

export default function LessonPackages() {
  const { isTeacher } = useAuth();

  const [searchParams] = useSearchParams();
  const currentUserId = searchParams.get("userId");

  if (!currentUserId) return <p>No user was found</p>;

  const { lessonTypes, isPending } = useLessonTypes(currentUserId);

  return (
    <section className="flex flex-col min-h-screen w-full">
      <PackagesHeader title="Available lesson types" />
      {isTeacher ? (
        <TeacherPackages lessonTypes={lessonTypes} isPending={isPending} />
      ) : (
        ""
      )}
    </section>
  );
}

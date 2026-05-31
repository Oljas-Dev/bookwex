import useStudent from "../../api/features/useStudent";
import Profile from "./ui/Profile";
import Settings from "./ui/Settings";

export default function ProfileSection() {
  const { student, isPendingStudent } = useStudent();

  return (
    <section className="grid grid-cols-[70%_30%] w-full bg-jade px-10 py-6 mb-8 [&_p]:text-lg">
      <Profile user={student} />
      <Settings user={student} status={isPendingStudent} />
    </section>
  );
}

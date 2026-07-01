import { useAuth } from "../contexts/useAuth";

interface Options {
  teacherOption: string | undefined;
  studentOption: string | undefined;
}

export default function SectionsHeader({
  title,
  options,
  fnTeacher,
  fnStudent,
  teacherId,
}: {
  title: string;
  options?: Options;
  fnTeacher?: () => void;
  fnStudent?: () => void;
  teacherId?: string;
}) {
  const { canEditProfile } = useAuth();
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-4xl font-bold max-[400px]:text-3xl">{title}</h2>

      {canEditProfile(teacherId) ? (
        <span className="cursor-pointer" onClick={fnTeacher}>
          <p>{options?.teacherOption}</p>
        </span>
      ) : (
        <span className="cursor-pointer" onClick={fnStudent}>
          <p>{options?.studentOption}</p>
        </span>
      )}
    </div>
  );
}

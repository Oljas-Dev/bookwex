import { AvatarPlaceholder } from "../../avatars/features/AvatarPlaceholder";

export default function TeacherCard({
  avatar,
  fullname,
  startDate = "not specified",
}: {
  avatar: string | undefined;
  fullname: string | undefined;
  startDate: string | undefined;
}) {
  function formatName(fullName: string | undefined) {
    if (!fullName) fullName = "user";

    const parts = fullName.trim().split(/\s+/);

    const firstName =
      parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();

    if (parts.length === 1) return firstName;

    const lastInitial = parts[1].charAt(0).toUpperCase();

    return `${firstName} ${lastInitial}.`;
  }
  return (
    <li className="flex flex-col items-center gap-2 w-50 py-4 border-2 border-peach rounded-xl shadow-[5px_6px_6px_var(--shadow-dark-card)]">
      <AvatarPlaceholder
        styles="w-15 h-15"
        avatarUrl={avatar}
        name={fullname}
        radius="rounded-full"
      />
      <h3 className="text-[16px]">{formatName(fullname)}</h3>
      <p>teacher - {startDate}</p>
    </li>
  );
}

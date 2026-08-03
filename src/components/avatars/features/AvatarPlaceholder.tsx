type Props = {
  name?: string;
  avatarUrl?: string | null;
  styles: string;
  borderColor?: string;
  radius?: string;
};

export function AvatarPlaceholder({
  name,
  avatarUrl,
  styles,
  borderColor = "border-peach",
  radius = "rounded-xl",
}: Props) {
  const colors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#3b82f6",
    "#6366f1",
    "#a855f7",
  ];

  const safeName = name?.trim() || "User";

  function stringToColor(str: string) {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  }

  function getInitials(name: string) {
    const parts = name.trim().split(" ");

    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  }

  const initials = getInitials(safeName);

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        className={`${styles} ${borderColor} ${radius} object-cover object-top  border-4 `}
        alt="avatar"
      />
    );
  }

  return (
    <div
      className={`${styles} ${borderColor} ${radius} border-4 flex items-center justify-center text-white font-semibold`}
      style={{
        background: `linear-gradient(135deg, ${stringToColor(safeName)}, gray)`,
      }}
    >
      {initials}
    </div>
  );
}

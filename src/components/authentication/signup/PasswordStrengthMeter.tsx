import { usePasswordStrength } from "./features/usePasswordStrength";

export default function PasswordStrengthMeter({
  password,
}: {
  password: string;
}) {
  const { score, label } = usePasswordStrength(password);

  const colors = ["#ddd", "#D8481C", "#D88A1C", "#D8D81C", "#49D739"];

  return (
    <div className="flex flex-col gap-2">
      {/* bars */}
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-2 w-[30%] rounded"
            style={{
              backgroundColor: i < score ? colors[score] : "#eee",
            }}
          />
        ))}
      </div>

      {/* label */}
      <p className="text-sm text-jet/70">{label}</p>
    </div>
  );
}

export default function AchievementsCard({
  value,
  title,
  smallText = false,
}: {
  value: string;
  title: string;
  smallText?: boolean;
}) {
  return (
    <div className="w-40 h-45 flex flex-col bg-jade text-center rounded-xl overflow-hidden shadow-[3px_3px_3px_var(--shadow-dark-card),-3px_-3px_3px_var(--shadow-light)] border-t border-l border-t-stroke-light border-l-stroke-light max-[600px]:w-25 max-[600px]:h-auto max-[450px]:hidden">
      <div className="flex-1 flex-center max-[600px]:p-2">
        <p
          className={`${smallText ? "text-5xl" : "text-7xl"} max-[600px]:text-4xl`}
        >
          {value}
        </p>
      </div>
      <div className="h-10 flex-center bg-peach border-t-3 border-jade-light max-[600px]:p-2 max-[600px]:h-auto">
        <p className="max-[600px]:p-2">
          <strong>{title}</strong>
        </p>
      </div>
    </div>
  );
}

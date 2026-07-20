export default function BenefitCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col justify-between items-center w-50 h-60 text-center px-5 pt-5 pb-6 border-8 border-jade shadow-[4px_4px_8px_var(--shadow-dark-card)] bg-secondary-bg rounded-2xl [&_p]:leading-5">
      <p className="font-bold">{title}</p>
      <p>{text}</p>
      <p className="text-2xl">✅</p>
    </div>
  );
}

export default function Feature({ text }: { text: string }) {
  return (
    <div className="w-fit border-8 border-jade shadow-[4px_4px_8px_var(--shadow-dark-card)] px-4 py-3 rounded-2xl">
      <p>{text}</p>
    </div>
  );
}

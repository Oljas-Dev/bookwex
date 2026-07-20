export default function StepsRow({
  text,
  icon,
}: {
  text: string;
  icon: string;
}) {
  return (
    <li className="flex flex-col gap-2">
      <div className="py-2 px-5 border-2 border-jet rounded-2xl">
        <p>{text}</p>
      </div>
      <span>
        <p>{icon}</p>
      </span>
    </li>
  );
}

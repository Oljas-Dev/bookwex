import BackButton from "../../../ui/BackButton";

export default function PackagesHeader({ title }: { title: string }) {
  return (
    <nav className="flex items-center py-6 px-10">
      <BackButton mg="0" />
      <span className="flex justify-center w-full">
        <h2>{title}</h2>
      </span>
    </nav>
  );
}

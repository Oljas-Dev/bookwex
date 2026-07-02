import { scrollToSection } from "../../helpers/features";
import Menu from "./ui/Menu";

export default function Navigation({ teacherId }: { teacherId: string }) {
  return (
    <nav className="grid grid-cols-[80%_20%] justify-items-center items-center w-full text-2xl my-6 px-4 cursor-pointer max-[900px]:flex max-[900px]:justify-around max-[500px]:justify-between">
      <ul className="flex gap-5 max-[400px]:gap-2">
        <li onClick={() => scrollToSection("calendar")}>calendar</li>
        <li onClick={() => scrollToSection("reviewsSection")}>reviews</li>
        <li onClick={() => scrollToSection("myOfferSection")}>plans</li>
      </ul>
      <Menu teacherId={teacherId} />
    </nav>
  );
}

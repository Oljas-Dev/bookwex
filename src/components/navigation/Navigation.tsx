import { Link } from "react-router-dom";
import { scrollToSection } from "../../helpers/features";
import Menu from "./ui/Menu";

export default function Navigation({ teacherId }: { teacherId: string }) {
  return (
    <nav className="grid grid-cols-[20%_60%_20%] justify-items-center items-center w-full text-2xl my-6 px-4 cursor-pointer max-[900px]:flex max-[900px]:justify-around max-[500px]:justify-between">
      <Link to="/">
        <h2>Bookwex</h2>
      </Link>
      <ul className="flex gap-5 max-[400px]:gap-2 max-[500px]:hidden">
        <li onClick={() => scrollToSection("calendar")}>calendar</li>
        <li onClick={() => scrollToSection("reviewsSection")}>reviews</li>
        <li onClick={() => scrollToSection("myOfferSection")}>plans</li>
      </ul>
      <Menu teacherId={teacherId} />
    </nav>
  );
}

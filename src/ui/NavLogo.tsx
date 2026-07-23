import { Link } from "react-router-dom";
import navLogo from "./../../public/nav-logo.svg";

export default function NavLogo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src={navLogo} alt="bookwex logo" />
      <h2 className="text-3xl font-bold">Bookwex</h2>
    </Link>
  );
}

import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { HouseFill } from "react-bootstrap-icons";

export default function AdminNav() {
  return (
    <nav className="flex items-center px-10 max-[800px]:justify-between">
      <Link to="/">
        <HouseFill size={24} />
      </Link>
      <ul className="flex gap-20 py-6 px-8 [&_a]:text-jet/50 [&_a]:text-2xl [&_a]:hover:text-jet max-[800px]:hidden">
        <li>
          <Link to="/admin/teachers">teachers</Link>
        </li>
        <li>
          <Link to="#">students</Link>
        </li>
        <li>
          <Link to="#">bookings</Link>
        </li>
        <li>
          <Link to="/admin/feedback">feedback</Link>
        </li>
      </ul>
      <MobileMenu />
    </nav>
  );
}

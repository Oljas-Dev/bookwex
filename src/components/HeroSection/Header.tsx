import useProfile from "../../api/features/useProfile";
import Stars from "./ui/Stars";

export default function Header() {
  const { profile } = useProfile();

  if (!profile) return <p>Waiting for profile to load...</p>;

  const fullName = profile?.full_name || "Guest";
  const userRole = !profile ? "guest" : profile?.role;

  return (
    <div>
      <div className="flex items-center gap-8">
        <h1>{fullName}</h1>
        <Stars />
      </div>
      <p className="font-semibold">{userRole}</p>
    </div>
  );
}

import useCurrentUser from "../../api/features/useCurrentUser";
import Profile from "./ui/Profile";
import Settings from "./ui/Settings";

export default function ProfileSection() {
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) return <p>data's loading...</p>;

  return (
    <section className="grid grid-cols-[70%_30%] w-full bg-jade px-10 py-6 mb-8 [&_p]:text-lg">
      <Profile user={currentUser} />
      <Settings user={currentUser} />
    </section>
  );
}

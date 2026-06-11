import { useDashboard } from "../../useTeacherData";

export default function ReviewsSectionDialog({ id }: { id: string }) {
  const { active } = useDashboard();

  if (id !== active) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("reviews");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="reviews" />
      <button>leave review</button>
    </form>
  );
}

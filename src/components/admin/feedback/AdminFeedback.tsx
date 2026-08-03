import { useAdminMessages } from "../features/hooks/useAdminMessages";

export default function AdminFeedback() {
  const { data } = useAdminMessages();

  return (
    <section className="w-full bg-jade px-10 py-6 mb-8 relative max-[900px]:flex max-[900px]:flex-col-reverse max-[900px]:items-center max-[900px]:gap-6">
      <ul className="[&_li]:border-b [&_li]:py-4">
        {data?.map((message) => {
          return (
            <li className="flex items-center gap-4" key={message.id}>
              <h4>{message.title}:</h4>
              <p>{message.message}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

import { useAdminMessages } from "./features/useAdminMessages";

export default function AdminDashboard() {
  const { data } = useAdminMessages();

  console.log(data);

  return (
    <div className="">
      <h2>Admin Dashboard</h2>
      <ul>
        {data?.map((row) => (
          <li>{row.message}</li>
        ))}
      </ul>
    </div>
  );
}

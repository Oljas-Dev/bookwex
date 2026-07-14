import dayjs from "dayjs";
import { useAuth } from "../../contexts/useAuth";
import { useAdminMessages } from "./features/useAdminMessages";

export default function AdminDashboard() {
  const { data } = useAdminMessages();
  const { profiles } = useAuth();

  // console.log(profiles);

  return (
    <div className="min-h-screen py-6 px-8">
      <h2>Admin Dashboard</h2>

      <ul>
        {data?.map((row) => (
          <li key={row.id} className="py-2 px-4 border-b border-jet">
            <p className="text-xl">{row.message}</p>
          </li>
        ))}
      </ul>

      <ul>
        {profiles?.map((user) => {
          const signUpDate = dayjs(user.created_at).format("DD/MM/YYYY");
          return (
            <li
              key={user.id}
              className="bg-amber-100 py-2 px-4 border-b border-jet"
            >
              <p className="text-xl">{user.full_name}</p>
              <p>{signUpDate}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

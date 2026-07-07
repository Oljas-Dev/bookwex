import { useAdminMessages } from "./features/useAdminMessages";

export default function AdminDashboard() {
  const { data } = useAdminMessages();

  console.log(data);

  return <div>admin</div>;
}

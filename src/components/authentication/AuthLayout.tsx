import { ArrowLeft } from "react-bootstrap-icons";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const navigate = useNavigate();
  return (
    <article className="flex flex-col gap-2 text-center justify-center  mx-auto px-10 min-h-screen max-[350px]:px-4">
      <ArrowLeft
        style={{ alignSelf: "start", cursor: "pointer" }}
        onClick={() => navigate(-1)}
      />
      <Outlet />
    </article>
  );
}

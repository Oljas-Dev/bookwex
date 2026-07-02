import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../api/supabase/supabase";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleCancel() {
    navigate(-1);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) {
      setError("New password is required");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password",
    });

    if (error) {
      console.error(error.message);
      toast.error(error.message);
    }

    setLoading(false);
    toast("We've send a reset link on your email");
  }

  return (
    <div className="flex flex-col gap-2 text-center justify-center  mx-auto px-10 h-screen max-[350px]:px-4">
      <div className="flex flex-col gap-3 px-4 pt-3 pb-6">
        <h2>We'll send a reset link to your email</h2>
        <h3>Please enter correct email</h3>
        <form onSubmit={handleSubmit} className="flex gap-2 min-w-75">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="emailForPass">Your email:</label>
            <input
              id="emailForPass"
              type="email"
              placeholder="enter your email"
              className="rounded"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">
              {loading ? "sending..." : "send reset link"}
            </button>
            <button type="reset" onClick={handleCancel}>
              cancel
            </button>
          </div>
        </form>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
}

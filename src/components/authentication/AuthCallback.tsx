import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabase/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(window.location.href);
    async function handleAuth() {
      await supabase.auth.getSession();

      navigate("/profile");
    }

    handleAuth();
  }, [navigate]);

  return <p>Signing you in...</p>;
}

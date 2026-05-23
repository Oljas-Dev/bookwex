import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabase/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleAuth() {
      await supabase.auth.getSession();

      navigate("/login");
    }

    handleAuth();
  }, [navigate]);

  return <p>Confirming account...</p>;
}

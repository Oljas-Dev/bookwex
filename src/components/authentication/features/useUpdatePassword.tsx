import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../../api/supabase/supabase";
import toast from "react-hot-toast";

export function useUpdatePassword() {
  const { mutate: changePassword, isPending: isChangingPassword } = useMutation(
    {
      mutationFn: async function handleChangePassword(newPassword: string) {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error) {
          console.error(error.message);
        }
      },
      onSuccess: () => {
        toast("User account successfully updated");
      },
      onError: (err) => toast.error(err.message),
    },
  );

  return { changePassword, isChangingPassword };
}

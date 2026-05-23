import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../contexts/useAuth";
import { uploadAvatarFile } from "../../avatars/features/uploadAvatar";
import { updateProfile } from "../../avatars/features/updateProfile";
import { useQueryClient } from "@tanstack/react-query";
import type { Profile } from "../../../contexts/AuthContextData";

export interface Updates {
  avatar_url: string | null;
  full_name: string | undefined;
}

export default function EditPersonalInfo({
  dialogFormRef,
}: {
  dialogFormRef: React.RefObject<HTMLDialogElement | null>;
}) {
  const { user, profile } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState<string>("");

  const queryClient = useQueryClient();

  // Close dialog function
  function closeDialog() {
    dialogFormRef?.current?.close();
  }

  // Close dialog when clicking outside
  const handleClickOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogFormRef?.current;
    if (dialog && e.target === dialog) {
      closeDialog();
      setAvatarFile(null);
    }
  };

  function handleCancel() {
    setAvatarFile(null);
    closeDialog();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user?.id) return;

    try {
      const updates: Partial<Profile> = {};

      // 1. avatar
      if (avatarFile) {
        const { filePath } = await uploadAvatarFile(avatarFile, user.id);

        updates.avatar_url = filePath; // store path in DB
      }

      // 2. name
      if (fullName?.trim()) {
        updates.full_name = fullName.trim().toLowerCase();
      }

      if (Object.keys(updates).length === 0) return;

      // 3. DB update
      await updateProfile(user.id, updates);

      // 4. cache update (instant UI)
      queryClient.setQueryData<Profile>(
        ["profiles", user.id],
        (old: Profile | undefined) => {
          if (!old) return old;

          return {
            ...old,
            ...updates,
          };
        },
      );

      toast.success("Profile updated");
      closeDialog();
    } catch (err) {
      console.error(err);

      toast.error("Failed to update profile");
    }
  }

  return (
    <dialog
      ref={dialogFormRef}
      onClick={handleClickOutside}
      className="
    fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/0 backdrop:backdrop-blur-xs open:backdrop:bg-black/50 transition-all rounded
  "
    >
      <div className="flex flex-col gap-3 px-4 pt-3 pb-6">
        <h2>Edit your profile</h2>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="newName">Change your display name:</label>
            <input
              id="newName"
              type="text"
              placeholder="change your name"
              defaultValue={profile?.full_name}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label htmlFor="avatarFile">Choose your profile image:</label>
            <input
              id="avatarFile"
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              className="rounded"
            />
            <button type="submit">save changes</button>
            <button type="reset" onClick={handleCancel}>
              cancel
            </button>
          </div>
          {avatarFile && (
            <img
              src={URL.createObjectURL(avatarFile)}
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}
        </form>
      </div>
    </dialog>
  );
}

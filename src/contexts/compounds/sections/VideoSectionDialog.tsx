import { useState } from "react";
import type { TeacherData } from "../../../types/db";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadVideoIntro } from "../../../components/videoIntroduction/features/uploadVideoIntro";
import { updateTeacherData } from "../../../components/videoIntroduction/features/updateTeacherData";
import { useAuth } from "../../useAuth";
import { useDashboard } from "../../useTeacherData";
import { useDialog } from "../dashboard-dialog/useDialog";

export default function VideoSectionDialog({ id }: { id: string }) {
  const { user } = useAuth();
  const { active, dialogDashboard } = useDashboard();
  const { closeDialog } = useDialog();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  if (id !== active) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user?.id || !videoFile) {
      setError("No video or active user");
      return;
    }

    if (!videoFile.type.startsWith("video/")) {
      setError("Please select a video");
      return;
    }

    if (videoFile.size > 50 * 1024 * 1024) {
      setError("Video must be under 100MB");
      return;
    }

    try {
      const updates: Partial<TeacherData> = {};

      setLoading(true);

      // 1. avatar
      if (videoFile) {
        const { filePath } = await uploadVideoIntro(videoFile, user.id);

        updates.video_intro = filePath; // store path in DB

        // 2. DB update
        await updateTeacherData(user.id, updates);

        await queryClient.invalidateQueries({
          queryKey: ["teacher_data", user.id],
        });

        // 3. cache update (instant UI)
        queryClient.setQueryData<TeacherData>(
          ["teacher_data", user.id],
          (old: TeacherData | undefined) => {
            if (!old) return old;

            return {
              ...old,
              ...updates,
            };
          },
        );

        setLoading(false);
        closeDialog(dialogDashboard);
        toast.success("Profile updated");
      }
    } catch (err) {
      console.error(err);

      setLoading(false);
      closeDialog(dialogDashboard);
      toast.error("Failed to update profile");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-150 px-4 py-6 [&_input]:rounded max-[700px]:w-full"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="video">Upload introduction video</label>

        <input
          id="video"
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
        />
      </div>

      {videoFile && (
        <p>
          {videoFile.name} ({Math.round(videoFile.size / 1024 / 1024)} MB)
        </p>
      )}

      {error && <p>{error}</p>}

      <div className="flex flex-col gap-2">
        <button type="submit" className="bg-jade">
          {loading ? "loading..." : "upload"}
        </button>
        <button type="reset" onClick={() => closeDialog(dialogDashboard)}>
          cancel
        </button>
      </div>
    </form>
  );
}

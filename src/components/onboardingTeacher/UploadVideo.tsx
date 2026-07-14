import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import type { TeacherData } from "../../types/db";
import { uploadVideoIntro } from "../videoIntroduction/features/uploadVideoIntro";
import { updateTeacherData } from "../videoIntroduction/features/updateTeacherData";
import toast from "react-hot-toast";
import { useState } from "react";

export interface VideoForm {
  video: FileList;
}

export default function UploadVideo() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VideoForm>();

  const navigate = useNavigate();
  const videoFile = watch("video")?.[0];

  async function uploadVideo(data: VideoForm) {
    if (!user?.id) {
      toast.error("No active user");
      return;
    }

    const videoFile = data.video[0];

    try {
      setLoading(true);

      // 1. video
      const { filePath } = await uploadVideoIntro(videoFile, user.id);

      const updates: Partial<TeacherData> = {
        video_intro: filePath,
      }; // store path in DB

      // 2. DB update
      await updateTeacherData(user.id, updates);

      navigate("/teacher-offers");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex justify-center w-full min-h-screen">
      <article className="text-jet flex flex-col gap-4 items-center min-h-screen bg-secondary-bg w-280 pb-5 max-[1200px]:w-full">
        <div className="w-full bg-jade py-8 text-center ">
          <h2 className="font-bold text-3xl">
            Upload your video introduction 🎥
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(uploadVideo)}
          className="flex flex-col items-center gap-4 w-full max-[500px]:px-2 max-[500px]:text-center"
        >
          <p className="text-2xl">Let students meet you</p>

          <div className="flex flex-col gap-2">
            <label htmlFor="video">Upload introduction video</label>

            <input
              id="video"
              type="file"
              accept="video/*"
              {...register("video", {
                required: "Please select a video",
                validate: {
                  isVideo: (files) =>
                    !files?.[0] ||
                    files[0].type.startsWith("video/") ||
                    "Please select a valid video file",

                  maxSize: (files) =>
                    !files?.[0] ||
                    files[0].size <= 50 * 1024 * 1024 ||
                    "Video must be under 50MB",
                },
              })}
              className={`rounded-lg border-2 p-2 outline-none max-[400px]:w-full ${
                errors.video ? "border-red-400" : "border-jade"
              }`}
            />

            {errors.video && (
              <p className="text-red-400">{errors.video.message}</p>
            )}
          </div>

          {videoFile && (
            <div className="mt-2 rounded-lg bg-gray-100 p-3">
              <p className="font-medium">{videoFile.name}</p>
              <p className="text-sm text-gray-600">
                {(videoFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          <div className="flex gap-4 max-[400px]:gap-2">
            <button type="button" onClick={() => navigate(-1)}>
              back
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "uploading..." : "next step"}
            </button>
            <button type="button" onClick={() => navigate("/teacher-offers")}>
              skip
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

import type { Dispatch, SetStateAction } from "react";
import { XCircle } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import type { AdminCategory } from "../../types/db";
import { useAuth } from "../../contexts/useAuth";
import { useCreateFeedback } from "./features/useCreateFeedback";
import toast from "react-hot-toast";

interface Feedback {
  title: string;
  message: string;
  category: Partial<AdminCategory>;
}

export default function SupportForm({
  show,
  close,
}: {
  show: boolean;
  close: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useAuth();
  const { mutate: sendFeedback, isPending } = useCreateFeedback(() => {
    close(false);
    toast.success("Thank you for your feedback!");
  });
  const { register, handleSubmit } = useForm<Feedback>();

  const sendUserFeedback = handleSubmit((data) => {
    if (!user) return;

    sendFeedback({
      user_id: user?.id,
      title: data.title,
      message: data.message,
      category: data.category,
    });
  });

  return (
    <div
      className={`${show ? "w-80 h-110 px-2 py-4 text-center rounded max-[400px]:w-60" : "flex items-center justify-center w-20 h-20 rounded-full"} bg-orange-200 shadow-[7px_7px_5px_var(--shadow-dark-card)] border-t-2 border-l-2 border-t-stroke-light border-l-stroke-light fixed right-6 bottom-6`}
    >
      <XCircle
        onClick={() => close(false)}
        className={`bg-jet/20 absolute -top-8 -left-8 hover:bg-jet/50 rounded-full cursor-pointer max-[400px]:bg-red-300/80 ${show ? "block" : "hidden"}`}
      />
      <form
        onSubmit={sendUserFeedback}
        className={`${show ? "flex flex-col gap-3 h-full text-[16px]" : "hidden"}`}
      >
        <h3>Your feedback is important for us</h3>

        <div className="flex flex-col gap-1">
          <label htmlFor="subject">Feedback subject</label>
          <input
            type="text"
            placeholder="subject"
            className="w-full rounded text-inherit placeholder:text-[16px]"
            {...register("title")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="category">choose category</label>
          <select {...register("category")} className="p-2">
            <option value="feedback">feedback</option>
            <option value="bug">bug</option>
            <option value="feature_request">feature request</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="message">Tell us your feedback</label>
          <textarea
            id="message"
            {...register("message")}
            className="border border-jet h-full rounded p-2"
            placeholder="write feedback..."
          ></textarea>
        </div>
        <button className="py-1">
          {isPending ? "sending" : "send feedback"}
        </button>
      </form>
      <p
        onClick={() => close(true)}
        className={`${show ? "hidden" : "block"} cursor-pointer`}
      >
        <strong>feedback</strong>
      </p>
    </div>
  );
}

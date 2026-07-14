import { ArrowLeft } from "react-bootstrap-icons";
import { useBecomeTeacher } from "../../../api/features/useBecomeTeacher";
import { useAuth } from "../../../contexts/useAuth";
import { useNavigate } from "react-router-dom";

export default function BecomeTeacher() {
  const { profile, isAuthenticated } = useAuth();
  const { activateTeacher } = useBecomeTeacher();

  const navigate = useNavigate();

  return (
    <article className="flex flex-col gap-2 text-center justify-center items-center  mx-auto px-6 py-4 min-h-screen max-[350px]:px-4">
      {isAuthenticated ? (
        <div className="bg-secondary-bg flex flex-col gap-4 items-center w-[50%] rounded-xl px-4 py-6 border border-jet/30 max-[1000px]:w-[80%] max-[600px]:w-full max-[500px]:[&_p]:text-sm">
          <ArrowLeft
            style={{ alignSelf: "start", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />

          <div className="flex flex-col gap-6 text-lg [&_p]:text-lg max-[500px]:text-sm">
            <h2 className="max-[500px]:text-xl">Early access on Bookwex 🚀</h2>
            <h3 className="max-[500px]:text-xl">Welcome! 🎉</h3>

            <p>
              This feature is currently available as part of an early testing
              program, and I'd love for you to be one of the first teachers to
              try it. By becoming a teacher on Bookwex, you'll be able to:
            </p>

            <ul className="self-center flex flex-col items-start w-fit">
              <li>➡️ Create your teacher profile.</li>
              <li>➡️ Invite your students to join the platform.</li>
              <li>➡️ Manage your lessons and availability.</li>
              <li>➡️ Explore the teaching tools and student experience.</li>
            </ul>

            <p>
              Use Bookwex as your own teaching website. The goal of this testing
              phase is to make Bookwex as useful and intuitive as possible for
              both teachers and students. As you use the platform, I encourage
              you to invite a few of your students and try the features in real
              teaching situations.
            </p>

            <p>
              Your feedback is incredibly valuable. If you notice something that
              could be improved, encounter a bug, or have ideas for new
              features, please let me know. Use feedback form in the right
              bottom corner to contact our team. Every suggestion helps shape
              the future of Bookwex. Thank you for helping build a better
              platform for teachers and learners!
            </p>
          </div>
          <button
            className="bg-jet text-jade hover:text-amber-200 w-fit"
            onClick={() => activateTeacher(profile?.id)}
          >
            Become a teacher
          </button>
        </div>
      ) : (
        <p>Please log in or sign up</p>
      )}
    </article>
  );
}

import { HouseFill, PersonFill } from "react-bootstrap-icons";
import { useAuth } from "../../contexts/useAuth";
import { Link } from "react-router-dom";
import { toParamStr } from "../../helpers/features";

export default function OnboardingComplete() {
  const { profile } = useAuth();

  return (
    <section className="flex justify-center w-full min-h-screen">
      <article className="text-jet flex flex-col items-center gap-4 min-h-screen bg-secondary-bg w-280 pb-5 max-[1200px]:w-full">
        <div className="w-full bg-jade py-8 text-center">
          <h2 className="font-bold text-3xl">
            Welcome to Your Teaching Business 🎉
          </h2>
        </div>

        <div className="bg-secondary-bg flex flex-col gap-4 items-center w-[50%] rounded-xl px-4 py-6 border border-jet/30 max-[800px]:w-[80%] max-[500px]:px-2 max-[500px]:text-center max-[400px]:w-[95%]">
          <div className="flex flex-col gap-6 text-lg [&_p]:text-lg">
            <h3>Your profile is ready to welcome students.</h3>
            <span className="flex">
              <p>
                Congratulations! Your Bookwex profile is live, and you're ready
                to welcome your first students. Your Profile section is your
                teacher dashboard.
              </p>
            </span>
            <p>There you'll find:</p>

            <ul className="self-center flex flex-col items-start w-fit">
              <li>➡️ Your public profile link to share with students.</li>
              <li>
                ➡️ Your lesson planning link to create and manage your
                availability.
              </li>
              <li>➡️ Everything you need to grow your tutoring business.</li>
            </ul>

            <p>
              Every successful tutor starts with a single student. We hope
              Bookwex helps you spend less time managing bookings and more time
              doing what you love—teaching. Thank you for trusting us to be part
              of your journey. We're excited to see your business grow and can't
              wait to celebrate your milestones along the way. Here's to new
              students, meaningful lessons, and a thriving tutoring business.
            </p>
            <p>Welcome to Bookwex. Happy teaching! ❤️</p>
          </div>

          <ul className="flex items-center gap-8">
            <li className="p-1 rounded border-2 border-jet hover:border-jade">
              <Link to="/profile">
                <PersonFill size={25} />
              </Link>
            </li>
            <li className="p-1 rounded border-2 border-jet hover:border-jade">
              <Link to={`/teacher/${toParamStr(profile?.full_name)}`}>
                <HouseFill size={25} />
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
}

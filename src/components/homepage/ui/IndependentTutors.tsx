export default function IndependentTutors() {
  return (
    <div className="flex items-center gap-12 border-8 border-jade shadow-[4px_4px_8px_var(--shadow-dark-card)] p-6 mx-18 rounded-2xl max-[700px]:mx-4 max-[600px]:flex-col max-[600px]:gap-4">
      <div className="border-8 border-jade shadow-[4px_4px_8px_var(--shadow-dark-card)] rounded-2xl px-4 py-3">
        <p className="text-xl!">Many tutors today use:</p>

        <ul className="flex flex-col items-center gap-2 text-[16px]">
          <li>Google Calendar</li>
          <li>WhatsApp</li>
          <li>Zoom</li>
          <li>Excel</li>
          <li>and more...</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 items-start">
        <h3 className="font-bold">
          Bookwex brings everything together into one place.
        </h3>

        <div className="flex flex-col items-start">
          <p className="font-bold leading-5">Missing a feature?</p>
          <p>
            Tell us what you need—we're building Bookwex together with tutors.
          </p>
        </div>
      </div>
    </div>
  );
}

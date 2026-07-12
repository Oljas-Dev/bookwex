import { useAuth } from "../contexts/useAuth";
import { useDashboard } from "../contexts/useTeacherData";

export default function EmptySection({
  h2,
  btnText,
  sectionId,
  dialogId,
  teacherId,
}: {
  h2: string;
  btnText: string;
  sectionId: string;
  dialogId: string;
  teacherId?: string;
}) {
  const { canEditProfile } = useAuth();
  const { setActive, dialogDashboard, openDialog } = useDashboard();

  function handleOpenDialog() {
    setActive(dialogId);
    openDialog(dialogDashboard);
  }
  return (
    <>
      {canEditProfile(teacherId) ? (
        <section
          id={sectionId}
          className="flex flex-col gap-4 w-full px-10 py-6 mb-8"
        >
          <h2 className="text-4xl font-bold">{h2}</h2>
          <div className="flex justify-center my-25">
            <button
              className="bg-transparent border-20 border-empty-sec-btn-stroke max-w-60 text-center py-8 px-4 hover:shadow-[3px_3px_3px_var(--shadow-dark-card)] hover:scale-103 active:scale-100 active:shadow-none"
              onClick={handleOpenDialog}
            >
              {btnText}
            </button>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

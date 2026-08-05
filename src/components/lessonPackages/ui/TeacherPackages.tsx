import Button from "../../../ui/Button";
import OffersContainer from "../../MyOfferSection/OffersContainer";
import type { TeacherLesson } from "../../../types/ui";
import LoaderPlaceHolder from "./LoaderPlaceHolder";

export default function TeacherPackages({
  lessonTypes,
  isPending,
}: {
  lessonTypes: TeacherLesson[] | undefined;
  isPending: boolean;
}) {
  if (isPending) return <LoaderPlaceHolder />;

  return (
    <>
      <article className="w-full bg-jade px-10 py-6 mb-8 relative max-[900px]:flex max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-6">
        <header className="flex justify-between items-center [&_p]:text-xl mb-10">
          <p>Choose a lesson type to create a package</p>
          <Button>add new lesson type</Button>
        </header>

        <OffersContainer
          offers={lessonTypes}
          justify="justify-between"
          lessonPackage={true}
        />
      </article>
    </>
  );
}

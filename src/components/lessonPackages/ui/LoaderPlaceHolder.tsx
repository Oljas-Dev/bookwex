import SmallSpinner from "../../../ui/Spinner";

export default function LoaderPlaceHolder() {
  return (
    <div className="flex justify-center items-center w-full min-h-[50%] bg-jade">
      <SmallSpinner />
    </div>
  );
}

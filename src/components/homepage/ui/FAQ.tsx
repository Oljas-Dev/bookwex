import Accordion from "./Accordion";

export default function FAQ() {
  return (
    <div className="flex-1 flex flex-col gap-2 ml-7 py-9 max-[900px]:w-full max-[400px]:ml-0">
      <h2>FAQ</h2>

      <ul className="flex flex-col gap-2 [&_li]:cursor-pointer [&_li]:hover:text-amber-100 overflow-auto px-2">
        <Accordion />
      </ul>
    </div>
  );
}

import { useState } from "react";
import { accordionFAQ } from "../features/HomepageData";
import Button from "../../../ui/Button";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function Accordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };
  return (
    <>
      {accordionFAQ.map((accordion: FAQ) => {
        return (
          <li className="" key={accordion.id}>
            <Button
              type="button"
              fn={() => toggleAccordion(accordion.id)}
              styles="flex w-full items-center justify-between py-1 text-left text-lg group-[span]:hover:text-jade"
            >
              <span className="group-hover:text-jade">
                {accordion.question}
              </span>
              <span className="group-hover:text-jade">
                {openId === accordion.id ? "−" : "+"}
              </span>
            </Button>
            {openId === accordion.id && (
              <div className="pt-2 text-center">
                <p className="text-lg! max-[400px]:text-sm!">
                  {accordion.answer}
                </p>
              </div>
            )}
          </li>
        );
      })}
    </>
  );
}

import { Link } from "react-router-dom";
import { ArrowUp, HouseFill } from "react-bootstrap-icons";
import Container from "../../../ui/Container";
import { scrollToSection } from "../../../helpers/features";
import type { LegalData } from "../../../types/legal";

interface LegalDocumentProps {
  legalData: LegalData;
  styles?: string;
}

export default function LegalDocument({
  legalData,
  styles,
}: LegalDocumentProps) {
  const metadata = legalData.find((item) => item.type === "metadata");

  const sections = legalData.filter((item) => item.type === "section");
  return (
    <Container>
      <nav id="privacyTop" className="py-4">
        <ul>
          <Link to="/homepage">
            <li className="flex gap-2">
              <HouseFill /> homepage
            </li>
          </Link>
        </ul>
      </nav>
      <div
        className={`flex flex-col gap-6 pb-6 px-8 [&_p]:text-[16px] [&_li]:text-[16px] ${styles}`}
      >
        <header>
          <h1>{metadata?.title}</h1>
          <p>Last updated: {metadata?.lastUpdated}</p>
        </header>

        {sections?.map((section) => {
          return (
            <section key={section.number} className="mb-12">
              <h2 className=" text-2xl font-semibold">
                {section.number}. {section.heading}
              </h2>

              {section.intro && <p className="">{section.intro}</p>}

              {section.paragraphs?.map((paragraph, i) => (
                <p key={i} className=" leading-7">
                  {paragraph}
                </p>
              ))}

              {section.controller && (
                <div className=" rounded-lg border p-4">
                  <p className="font-semibold">{section.controller.name}</p>
                  <p>{section.controller.organization}</p>
                  <p>{section.controller.contact}</p>
                </div>
              )}

              {section.paragraphsAfterController?.map((paragraph, i) => (
                <p key={i} className=" leading-7">
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul className=" list-disc space-y-2 pl-6">
                  {section.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}

              {section.paragraphsAfterBullets?.map((paragraph, i) => (
                <p key={i} className=" leading-7">
                  {paragraph}
                </p>
              ))}

              {section.note && (
                <p className="italic text-muted-foreground">{section.note}</p>
              )}

              {section.subsections?.map((subsection, i) => (
                <div key={i} className="mt-8">
                  <h3 className="mb-3 text-xl font-medium">
                    {subsection.heading}
                  </h3>

                  {subsection.paragraphs?.map((paragraph, j) => (
                    <p key={j} className=" leading-7">
                      {paragraph}
                    </p>
                  ))}

                  {subsection.bullets && (
                    <ul className=" list-disc space-y-2 pl-6">
                      {subsection.bullets.map((bullet, j) => (
                        <li key={j}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {subsection.note && (
                    <p className="italic text-muted-foreground">
                      {subsection.note}
                    </p>
                  )}
                </div>
              ))}
            </section>
          );
        })}

        <button
          onClick={() => scrollToSection("privacyTop")}
          className="flex justify-center bg-transparent border-none outline-none"
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </Container>
  );
}

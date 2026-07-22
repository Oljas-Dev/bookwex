import LegalDocument from "./ui/LegalDocument";
import { aboutData } from "../homepage/features/HomepageData";
import SEO from "../SEO";
import { aboutSchema } from "../../helpers/seo/schemas";

export default function AboutBookwex() {
  return (
    <>
      <SEO
        title="About Bookwex – Tools for Independent Tutors"
        description="Learn how Bookwex helps tutors spend less time managing their business and more time teaching."
        canonical="https://bookwex.com/about"
        schema={aboutSchema}
      />
      <LegalDocument legalData={aboutData} />
    </>
  );
}

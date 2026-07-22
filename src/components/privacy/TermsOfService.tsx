import LegalDocument from "./ui/LegalDocument";
import { termsOfServiceData } from "./features/termOfService";
import SEO from "../SEO";
import { termsSchema } from "../../helpers/seo/schemas";

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service | Bookwex"
        description="Read the terms and conditions for using Bookwex."
        canonical="https://bookwex.com/terms"
        schema={termsSchema}
      />
      <LegalDocument legalData={termsOfServiceData} />
    </>
  );
}

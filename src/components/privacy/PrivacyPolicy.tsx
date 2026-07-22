import LegalDocument from "./ui/LegalDocument";
import { privacyPolicyData } from "./features/PrivacyPolicyData";
import SEO from "../SEO";
import { privacySchema } from "../../helpers/seo/schemas";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Bookwex"
        description="Read how Bookwex collects, uses, and protects your personal information."
        canonical="https://bookwex.com/privacy"
        schema={privacySchema}
      />
      <LegalDocument legalData={privacyPolicyData} />
    </>
  );
}

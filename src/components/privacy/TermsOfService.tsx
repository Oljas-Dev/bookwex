import LegalDocument from "./ui/LegalDocument";
import { termsOfServiceData } from "./features/termOfService";

export default function TermsOfService() {
  return <LegalDocument legalData={termsOfServiceData} />;
}

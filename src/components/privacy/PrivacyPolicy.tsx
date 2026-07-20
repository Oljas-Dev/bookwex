import LegalDocument from "./ui/LegalDocument";
import { privacyPolicyData } from "./features/PrivacyPolicyData";

export default function PrivacyPolicy() {
  return <LegalDocument legalData={privacyPolicyData} />;
}

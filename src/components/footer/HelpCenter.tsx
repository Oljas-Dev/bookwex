import { Link } from "react-router-dom";
import Container from "../../ui/Container";
import ContactLayout from "./ui/ContactLayout";

export default function HelpCenter() {
  return (
    <Container>
      <ContactLayout>
        <h2>Help Center</h2>
        <div>
          <p>Bookwex is currently in beta.</p>
          <p>If you have questions or need help, contact us:</p>
        </div>
        <Link to={"mailto:support@bookwex.com?subject=Bookwex%20Help%20Center"}>
          ➡️ support@bookwex.com
        </Link>
      </ContactLayout>
    </Container>
  );
}

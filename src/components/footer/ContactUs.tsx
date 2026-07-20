import { Link } from "react-router-dom";
import Container from "../../ui/Container";
import ContactLayout from "./ui/ContactLayout";

export default function ContactUs() {
  return (
    <Container>
      <ContactLayout>
        <h2>Contact us</h2>
        <div>
          <p>
            Have a question, suggestion, or want to learn more about Bookwex?
          </p>
          <p>Email us at:</p>
        </div>
        <Link to={"mailto:hello@bookwex.com?subject=Bookwex%20Contact%20Us"}>
          ➡️ hello@bookwex.com
        </Link>
      </ContactLayout>
    </Container>
  );
}

import { Link } from "react-router-dom";
import Container from "../../ui/Container";
import ContactLayout from "./ui/ContactLayout";

export default function ReportProblem() {
  return (
    <Container>
      <ContactLayout>
        <h2>Report a Problem</h2>

        <div className="">
          <p>Found a bug or something isn't working correctly?</p>
          <p>Please describe the issue and include:</p>
        </div>

        <ul className="list-disc pl-14">
          <li>
            <p>what you were trying to do</p>
          </li>
          <li>
            <p>what happened</p>
          </li>
          <li>
            <p>screenshots (if possible)</p>
          </li>
        </ul>
        <Link
          to={"mailto:support@bookwex.com?subject=Bookwex%20Problem%20Report"}
        >
          ➡️ support@bookwex.com
        </Link>
      </ContactLayout>
    </Container>
  );
}

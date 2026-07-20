import { Link } from "react-router-dom";
import { footerLinks } from "../homepage/features/HomepageData";
import { toParamStr } from "../../helpers/features";

export default function Footer() {
  return (
    <footer className="bg-jet **:text-jade w-full h-40 -mb-5 pt-4 relative max-[600px]:h-auto max-[600px]:pb-10">
      <ul className="flex justify-between text-lg px-6 gap-4 max-[600px]:flex-wrap">
        {footerLinks.map((section) => {
          return (
            <li key={section.id}>
              <h3 className="text-lg">{section.section}</h3>
              <div className="flex flex-col">
                {section.links.map((link) => {
                  return (
                    <Link
                      to={link.href}
                      className="text-sm hover:text-secondary-bg"
                      key={`${section.id}-${toParamStr(link.text)}`}
                    >
                      {link.text}
                    </Link>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
      <span className="text-jade text-sm absolute bottom-2 right-4">
        © 2026 Bookwex
      </span>
    </footer>
  );
}

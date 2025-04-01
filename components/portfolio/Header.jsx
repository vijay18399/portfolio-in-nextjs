import { useRouter } from "next/router";
import Link from "next/link";
import SectionControls from "../editor/main/SectionControls";

export default function Header({ data }) {
  const router = useRouter();

  return (
    <div className="header-wrapper" id={data.id}>
      <SectionControls data={data} />
      <header className="header-main">
        <div className="profile">{data.data.title}</div>
        <nav className="nav">
          <ul>
          {data?.data?.links.map(({ title, href }, index) => (
           <li> <Link
              key={index}
              href={href}
              className={`nav-link ${router.pathname === href ? "activeLink" : ""}`}
            >
              {title}
            </Link>
            </li>
          ))}

          </ul>
     
        </nav>
      </header>
    </div>
  );
}

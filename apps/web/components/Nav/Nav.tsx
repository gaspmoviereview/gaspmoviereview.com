"use server";
import Link from "next/link";
import { APIImageFormatType, APILinkType } from "../../types/api";
import styles from "./Nav.module.scss";
import Image from "next/image";
import { NavButton } from "./NavButton";
import { NavDrawer } from "./NavDrawer";

type NavProps = {
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  links: APILinkType[];
  logo: APIImageFormatType;
};

const Nav: React.FC<NavProps> = ({ testId, id, style, links, logo }) => {
  return (
    <div
      data-testid={testId}
      style={style}
      className={styles["nav-wrapper"]}
      id={id}
      role="navigation"
    >
      <nav className={styles["nav-inner"]}>
        <div className={styles["nav-logo"]}>
          <Link href={"/"} title="Back to home">
            <Image
              style={{ objectFit: "contain" }}
              width={100}
              height={40}
              alt={logo?.name}
              src={`${process.env.NEXT_PUBLIC_CMS_URI}${logo?.url}`}
            />
          </Link>
        </div>
        <div className={styles["nav-triggers"]}>
          <NavButton isOpen={true} />
        </div>
        <NavDrawer links={links} logo={logo} />
      </nav>
    </div>
  );
};

export { Nav };

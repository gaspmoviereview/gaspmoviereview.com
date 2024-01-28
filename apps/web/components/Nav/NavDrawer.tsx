import React from "react";
import styles from "./NavDrawer.module.scss";
import Link from "next/link";
import Image from "next/image";
import { APIImageFormatType, APILinkType } from "../../types/api";
import { NavButton } from "./NavButton";

type NavDrawerProps = {
  logo: APIImageFormatType;
  links: APILinkType[];
};

const NavDrawer: React.FC<NavDrawerProps> = ({ logo, links }) => {
  return (
    <div id="nav-drawer" aria-hidden="true" className={styles["nav-drawer"]}>
      <div className={styles["nav-content"]}>
        <div className={styles["nav-drawer-header"]}>
          <Link href={"/"} title="Back to home">
            <Image
              style={{ objectFit: "contain" }}
              width={100}
              height={40}
              alt={logo?.name}
              src={`${process.env.NEXT_PUBLIC_CMS_URI}${logo?.url}`}
            />
          </Link>
          <NavButton isOpen={false} />
        </div>
        <ul className={styles["nav-list"]}>
          {links.map((link) => (
            <li
              key={`nav-link-${link.id}`}
              className={styles["nav-link-wrapper"]}
            >
              <Link
                href={link.url}
                title={link.title}
                className={styles["nav-link"]}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { NavDrawer };

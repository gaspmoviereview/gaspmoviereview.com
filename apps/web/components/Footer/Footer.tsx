import Link from "next/link";
import styles from "./Footer.module.scss";
import React from "react";
import { APIFooterColumnType } from "../../types/api";

type FooterProps = {
  columns: APIFooterColumnType[];
};

const Footer: React.FC<FooterProps> = ({ columns }) => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-columns"]}>
        {columns.map((column) => (
          <div
            className={styles["footer-column"]}
            key={`footer-column-${column.id}`}
          >
            <h3>{column.title}</h3>
            <ul className={styles["footer-links-list"]}>
              {column.links.map((link) => (
                <li
                  className={styles["footer-link-wrapper"]}
                  key={`footer-link-${link.id}-${link.url}`}
                >
                  <Link href={link.url} title={link.title}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles["footer-disclaimer"]}>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://makingstuffs.co.uk"
          title="Made by Making Stuffs"
        >
          Made by Making Stuffs
        </Link>
      </div>
    </footer>
  );
};

export { Footer };

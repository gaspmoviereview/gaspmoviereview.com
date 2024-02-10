import React from "react";
import styles from "./Pagination.module.scss"; // Add scss module
import Link from "next/link";

type PaginationProps = {
  links: {
    isActive: boolean;
    href: string;
    label: string;
  }[];
};

const Pagination: React.FC<PaginationProps> = ({ links }) => {
  // Alter render method
  return (
    <div className={styles["pagination-wrapper"]}>
      {links.map((link) => (
        <Link
          className={styles["pagination-trigger"]}
          href={link.href}
          aria-disabled={!link.isActive}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export { Pagination };

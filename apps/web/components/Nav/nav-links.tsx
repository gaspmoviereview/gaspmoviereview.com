"use client";

import { APILinkType } from "../../types/api";
import { useScreenSize } from "@repo/react-utils";
import { cn } from "@repo/ui/lib/utils";
import { AnchorLink } from "../base/anchor-link/anchor-link";

export function NavLinks({
  links,
  linkOnClickCallback,
}: {
  links: APILinkType[];
  linkOnClickCallback?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const { width } = useScreenSize();
  return (
    <ul className={cn("flex gap-4 flex-col sm:flex-row")}>
      {links.map((link) => (
        <li key={`nav-link-${link.id}`}>
          <AnchorLink
            href={link.url}
            title={link.title}
            onClick={linkOnClickCallback}
          >
            {link.label}
          </AnchorLink>
        </li>
      ))}
    </ul>
  );
}

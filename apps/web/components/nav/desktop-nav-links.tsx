"use client";

import { NavLinks } from "./nav-links";
import { APILinkType } from "../../types/api";

export function DesktopNavLinks({ links }: { links: APILinkType[] }) {
  return <NavLinks className="hidden" links={links} />;
}

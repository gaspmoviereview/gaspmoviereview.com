"use client";

import React, { useState } from "react";
import Image from "next/image";
import { APIImageFormatType, APILinkType } from "../../types/api";
import { NavButton } from "./nav-button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@repo/ui/components/sheet";
import { NavLinks } from "./nav-links";
import { AnchorLink } from "../base/anchor-link/anchor-link";
import { Separator } from "@repo/ui/components/separator";
import { SocialFollow } from "../social-follow";

type NavDrawerProps = {
  logo: APIImageFormatType;
  links: APILinkType[];
};

const NavDrawer: React.FC<NavDrawerProps> = ({ logo, links }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <NavButton setIsOpen={setIsOpen} />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <AnchorLink
            href={"/"}
            title="Back to home"
            className="flex justify-center w-full"
          >
            <Image
              style={{ objectFit: "contain" }}
              width={100}
              height={40}
              alt={logo?.name}
              src={`${process.env.NEXT_PUBLIC_CMS_URI}${logo?.url}`}
            />
          </AnchorLink>
        </SheetHeader>
        <Separator className="mb-6" />
        <div className="flex flex-col h-full">
          <NavLinks
            links={links}
            linkOnClickCallback={() => setIsOpen(false)}
          />
        </div>
        <Separator className="mt-6" />
        <SheetFooter>
          <div className="flex justify-center gap-4">
            <SocialFollow
              links={[
                {
                  platform: "instagram",
                  url: "https://www.instagram.com/gaspmoviereview",
                },
              ]}
              variant="ghost"
              className="[&>a]:text-primary"
            />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export { NavDrawer };

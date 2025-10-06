import React from "react";
import { Icons } from "@repo/ui/components/icons";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

export type SocialPlatform =
  | "twitter"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "github"
  | "rss"
  | "email";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
  label?: string;
};

type SocialFollowProps = {
  links: SocialLink[];
  className?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  showLabels?: boolean;
};

const platformConfig: Record<
  SocialPlatform,
  { icon: keyof typeof Icons; defaultLabel: string; ariaLabel: string }
> = {
  twitter: {
    icon: "twitter",
    defaultLabel: "Twitter",
    ariaLabel: "Follow on Twitter",
  },
  facebook: {
    icon: "facebook",
    defaultLabel: "Facebook",
    ariaLabel: "Follow on Facebook",
  },
  instagram: {
    icon: "instagram",
    defaultLabel: "Instagram",
    ariaLabel: "Follow on Instagram",
  },
  linkedin: {
    icon: "linkedin",
    defaultLabel: "LinkedIn",
    ariaLabel: "Follow on LinkedIn",
  },
  youtube: {
    icon: "youtube",
    defaultLabel: "YouTube",
    ariaLabel: "Subscribe on YouTube",
  },
  github: {
    icon: "gitHub",
    defaultLabel: "GitHub",
    ariaLabel: "Follow on GitHub",
  },
  rss: { icon: "rss", defaultLabel: "RSS Feed", ariaLabel: "Subscribe to RSS" },
  email: {
    icon: "mail",
    defaultLabel: "Email",
    ariaLabel: "Subscribe via Email",
  },
};

const SocialFollow: React.FC<SocialFollowProps> = ({
  links,
  className,
  variant = "outline",
  size = "icon",
  showLabels = false,
}) => {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {links.map((link, index) => {
        const config = platformConfig[link.platform];
        if (!config) {
          console.warn(`Unknown platform: ${link.platform}`);
          return null;
        }

        const Icon = Icons[config.icon];
        const label = link.label || config.defaultLabel;

        return (
          <Button
            key={`${link.platform}-${index}`}
            variant={variant}
            size={size}
            asChild
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={config.ariaLabel}
              title={label}
            >
              <Icon className={cn("h-5 w-5", showLabels && "mr-2")} />
              {showLabels && <span>{label}</span>}
            </a>
          </Button>
        );
      })}
    </div>
  );
};

export { SocialFollow };

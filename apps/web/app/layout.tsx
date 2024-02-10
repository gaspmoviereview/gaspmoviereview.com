import "../styles//globals.scss";
import type { Metadata } from "next";
import { Inria_Sans } from "next/font/google";
import { Fonts } from "./fonts";
import { getSiteInfo } from "../services/api/getSiteInfo";

const inria = Inria_Sans({ subsets: ["latin"], weight: ["400", "300", "700"] });

export const generateMetadata = async (): Promise<Metadata> => {
  const siteInfo = await getSiteInfo();

  return {
    title: {
      template: `%s | ${siteInfo.name} | ${siteInfo.tagline}`,
      default: `${siteInfo.name} | ${siteInfo.tagline}`,
    },
    description: siteInfo.tagline,
    applicationName: siteInfo.name,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    openGraph: {
      images: siteInfo.socialShareImage.url,
    },
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <head>
        <Fonts />
      </head>
      <body className={`${inria.className}`}>{children}</body>
    </html>
  );
}

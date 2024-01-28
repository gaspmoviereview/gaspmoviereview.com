import "../styles//globals.scss";
import type { Metadata } from "next";
import { Inria_Sans, Courier_Prime, Permanent_Marker } from "next/font/google";
import { Fonts } from "./fonts";

const inter = Inria_Sans({ subsets: ["latin"], weight: ["400", "300", "700"] });
const courier = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"] });
const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
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
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
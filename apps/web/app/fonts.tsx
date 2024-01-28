"use client";
import { useServerInsertedHTML } from "next/navigation";
import { Inria_Sans, Courier_Prime, Permanent_Marker } from "next/font/google";

const inria = Inria_Sans({ subsets: ["latin"], weight: ["400", "300", "700"] });
const courier = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"] });
const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

export const Fonts = () => {
  useServerInsertedHTML(() => (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            --font-inria: ${inria.style.fontFamily};
            --font-courier: ${courier.style.fontFamily};
            --font-permanent-marker: ${permanentMarker.style.fontFamily};
          }
          `,
      }}
    />
  ));
  return null;
};

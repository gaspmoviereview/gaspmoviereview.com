import React from "react";
import { APIImageType, APILinkType } from "../../types/api";
import styles from "./HomePageHeader.module.scss";
import Image from "next/image";

export type HomePageHeaderProps = {
  backgroundImage: APIImageType;
  logoImage: APIImageType;
  title: string;
  tagline: string;
  cta: APILinkType;
};

const HomePageHeader: React.FC<HomePageHeaderProps> = ({
  backgroundImage,
  logoImage,
  title,
}) => {
  return (
    <header className={styles["home-header-wrapper"]}>
      <Image
        className={styles["background-image"]}
        src={`${process.env.NEXT_PUBLIC_CMS_URI}${backgroundImage?.url}`}
        fill
        alt={
          backgroundImage.alternativeText ||
          backgroundImage.caption ||
          backgroundImage.name
        }
      />
      <div className={styles["header-content"]}>
        <div className={styles["logo-wrapper"]}>
          <Image
            src={`${process.env.NEXT_PUBLIC_CMS_URI}${logoImage?.url}`}
            alt={
              logoImage.alternativeText || logoImage.caption || logoImage.name
            }
            fill
          />
        </div>
        <h1>{title}</h1>
      </div>
    </header>
  );
};

export { HomePageHeader };

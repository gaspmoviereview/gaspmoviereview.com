import { Content } from "../components/Base/Content/Content";
import { Header } from "../components/Header/Header";
import { Nav } from "../components/Nav/Nav";
import { getLatestReviewCards } from "../services/api/getLatestReviewCards";
import { getPageBySlug } from "../services/api/getPageBySlug";
import { getPageMetadataBySlug } from "../services/api/getPageMetadataBySlug";
import { getSiteInfo } from "../services/api/getSiteInfo";
import styles from "./page.module.scss";
import { ReviewCard } from "../components/Card/ReviewCard";
import { Footer } from "../components/Footer/Footer";
import { GenericStructuredData } from "../components/Base/GenericStructuredData/GenericStructuredData";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageMetadataBySlug("home");
  return {
    title: `Home`,
    description: data?.description,
  };
}

export default async function Page(): Promise<JSX.Element> {
  const siteInfo = await getSiteInfo();
  const pageData = await getPageBySlug("home");
  const reviews = await getLatestReviewCards();

  return (
    <main>
      <Nav
        links={siteInfo.navLinks}
        logo={siteInfo.logoDark.formats.thumbnail}
      />
      <Header
        headerStyle="HOME"
        backgroundImage={pageData.featuredImage}
        logoImage={siteInfo.logoLight}
        title={siteInfo.tagline}
        cta={{ label: "Do something", title: "Go somewhere", url: "/", id: 1 }}
        tagline={siteInfo.tagline}
      />
      <div className={styles.content}>
        <Content content={pageData.content} />
        <ul className={styles["latest-reviews-wrapper"]}>
          {reviews.data.map((review) => (
            <li
              className={styles["latest-review"]}
              key={`hp-review-card-${review.id}`}
            >
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>
      <Footer columns={siteInfo.footerLinkColumns} />
      <GenericStructuredData page={pageData} />
    </main>
  );
}

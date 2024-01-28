import { Content } from "../../components/Base/Content/Content";
import { Nav } from "../../components/Nav/Nav";
import { getLatestReviewCards } from "../../services/api/getLatestReviewCards";
import { getPageBySlug } from "../../services/api/getPageBySlug";
import { getPageMetadataBySlug } from "../../services/api/getPageMetadataBySlug";
import { getSiteInfo } from "../../services/api/getSiteInfo";
import styles from "./page.module.scss";
import { ReviewCard } from "../../components/Card/ReviewCard";
import { Footer } from "../../components/Footer/Footer";
import { GenericStructuredData } from "../../components/Base/GenericStructuredData/GenericStructuredData";

export async function generateMetadata() {
  const data = await getPageMetadataBySlug("reviews");
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
  const page = searchParams?.page ? Number(searchParams?.page) : 1;
  const siteInfo = await getSiteInfo();
  const pageData = await getPageBySlug("reviews");
  const reviews = await getLatestReviewCards(page);

  return (
    <main>
      <Nav
        links={siteInfo.navLinks}
        logo={siteInfo.logoDark.formats.thumbnail}
      />
      <header className={styles["header"]}>
        <div className={styles["header-content"]}>
          <h1>{pageData.title}</h1>
          <span>{pageData.description}</span>
        </div>
      </header>
      <div className={styles.content}>
        <Content content={pageData.content} />
        <ul className={styles["latest-reviews-wrapper"]}>
          {reviews.map((review) => (
            <li key={`plp-review-card-${review.id}`}>
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

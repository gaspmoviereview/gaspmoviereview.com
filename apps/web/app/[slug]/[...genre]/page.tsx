import { Content } from "../../../components/Base/Content/Content";
import { Nav } from "../../../components/Nav/Nav";
import { getPageBySlug } from "../../../services/api/getPageBySlug";
import { getPageMetadataBySlug } from "../../../services/api/getPageMetadataBySlug";
import { getSiteInfo } from "../../../services/api/getSiteInfo";
import styles from "./page.module.scss";
import { Footer } from "../../../components/Footer/Footer";
import { GenericStructuredData } from "../../../components/Base/GenericStructuredData/GenericStructuredData";
import { getGenreBySlug } from "../../../services/api/getGenreBySlug";
import { ReviewCard } from "../../../components/Card/ReviewCard";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPageMetadataBySlug(params.slug);
  return {
    title: data?.title,
    description: data?.description,
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string; genre: string };
}): Promise<JSX.Element> {
  const siteInfo = await getSiteInfo();
  const genreData = await getGenreBySlug(`${params.genre[0]}`);
  const pageData = await getPageBySlug(params?.slug);
  return (
    <main>
      <Nav
        links={siteInfo.navLinks}
        logo={siteInfo.logoDark.formats.thumbnail}
      />
      <header className={styles["header"]}>
        <div className={styles["header-content"]}>
          <h1>{genreData.title}</h1>
          <span>
            Currently displaying all posts which are related to the{" "}
            <strong>{genreData.title}</strong> genre.
          </span>
        </div>
      </header>
      <div className={styles.content}>
        <ul className={styles["latest-reviews-wrapper"]}>
          {genreData.reviews.map((review) => (
            <li key={`plp-review-card-${review.id}`}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles["contact-wrapper"]}></div>
      <Footer columns={siteInfo.footerLinkColumns} />
    </main>
  );
}

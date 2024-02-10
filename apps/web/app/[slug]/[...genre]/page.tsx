import { Nav } from "../../../components/Nav/Nav";
import { getSiteInfo } from "../../../services/api/getSiteInfo";
import styles from "./page.module.scss";
import { Footer } from "../../../components/Footer/Footer";
import { getGenreBySlug } from "../../../services/api/getGenreBySlug";
import { ReviewCard } from "../../../components/Card/ReviewCard";
import { getReviewsByGenre } from "../../../services/api/getReviewsByGenre";
import { Pagination } from "../../../components/Pagination/Pagination";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string; genre: string[] };
  searchParams?: { page?: number };
}) {
  const genreData = await getGenreBySlug(`${params.genre[0]}`);

  return {
    title: `${genreData?.title} Reviews | Page ${searchParams?.page || 1}`,
    description: genreData?.description,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string; genre: string[] };
  searchParams: {
    page?: number;
  };
}): Promise<JSX.Element> {
  const siteInfo = await getSiteInfo();
  const genreData = await getGenreBySlug(`${params.genre[0]}`);
  const { data: reviews, meta } = await getReviewsByGenre(
    `${params.genre[0]}`,
    searchParams?.page
  );
  const firstPostOnPage =
    meta?.pagination.page && meta?.pagination.page > 1
      ? (meta?.pagination.page - 1) * 6
      : 0;
  const lastPostOnPage = firstPostOnPage + reviews.length - 1;

  return (
    <main>
      <Nav
        links={siteInfo.navLinks}
        logo={siteInfo.logoDark.formats.thumbnail}
      />
      <header className={styles["header"]}>
        <div className={styles["header-content"]}>
          <h1>
            {genreData.title} <span>(Page {searchParams.page || "1"})</span>
          </h1>
          <span>
            Currently displaying posts{" "}
            {firstPostOnPage === 0 ? 1 : firstPostOnPage} to {lastPostOnPage} of
            the <strong>{genreData.title}</strong> genre. There are a total of{" "}
            {meta.pagination.total} posts in this genre.
          </span>
        </div>
      </header>
      <div className={styles.content}>
        <ul className={styles["latest-reviews-wrapper"]}>
          {reviews?.map((review) => (
            <li key={`plp-review-card-${review.id}`}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        links={Array(meta.pagination.pageCount)
          .fill(null)
          .map((_, i) => ({
            href: `/genre/${params.genre[0]}?page=${1 + i}`,
            isActive: !(
              Number(searchParams.page) === 1 + i ||
              (!searchParams.page && i + 1 === 0)
            ),
            label: `${i + 1}`,
          }))}
      />
      <Footer columns={siteInfo.footerLinkColumns} />
    </main>
  );
}

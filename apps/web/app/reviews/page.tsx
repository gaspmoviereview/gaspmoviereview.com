import { Nav } from "../../components/Nav/Nav";
import { getLatestReviewCards } from "../../services/api/getLatestReviewCards";
import { getPageBySlug } from "../../services/api/getPageBySlug";
import { getPageMetadataBySlug } from "../../services/api/getPageMetadataBySlug";
import { getSiteInfo } from "../../services/api/getSiteInfo";
import styles from "./page.module.scss";
import { ReviewCard } from "../../components/Card/ReviewCard";
import { Footer } from "../../components/Footer/Footer";
import { Pagination } from "../../components/Pagination/Pagination";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const data = await getPageMetadataBySlug("reviews");
  if (!data) return notFound();

  return {
    title: data?.title,
    description: data?.description,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { page: number };
}): Promise<JSX.Element> {
  const page = searchParams?.page ? Number(searchParams?.page) : 1;
  const siteInfo = await getSiteInfo();
  const pageData = await getPageBySlug("reviews");
  const { data: reviews, meta } = await getLatestReviewCards(page);

  const firstPostOnPage =
    meta?.pagination.page && meta?.pagination.page > 1
      ? (meta?.pagination.page - 1) * 6
      : 0;

  const lastPostOnPage = firstPostOnPage + reviews.length;

  return (
    <main>
      <Nav
        links={siteInfo.navLinks}
        logo={siteInfo.logoDark.formats.thumbnail}
      />
      <header className={styles["header"]}>
        <div className={styles["header-content"]}>
          <h1>
            Reviews <span>(Page {searchParams?.page || "1"})</span>
          </h1>
          <span>
            Currently displaying posts{" "}
            {firstPostOnPage === 0 ? 1 : firstPostOnPage} to {lastPostOnPage}{" "}
            from all genres. There are a total of {meta.pagination.total} posts.
          </span>
        </div>
      </header>
      <div className={styles.content}>
        <ul className={styles["latest-reviews-wrapper"]}>
          {reviews.map((review) => (
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
            href: `/reviews?page=${1 + i}`,
            isActive: !(
              Number(searchParams?.page) === 1 + i ||
              (!searchParams?.page && i === 0)
            ),
            label: `${i + 1}`,
          }))}
      />
      <Footer columns={siteInfo.footerLinkColumns} />
    </main>
  );
}

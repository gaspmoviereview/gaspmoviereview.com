import Image from "next/image";
import { Content } from "../../../components/Base/Content/Content";
import { GaspFactorCard } from "../../../components/Card/GaspFactorCard";
import { Nav } from "../../../components/Nav/Nav";
import { getReviewBySlug } from "../../../services/api/getReviewBySlug";
import { getSiteInfo } from "../../../services/api/getSiteInfo";
import styles from "./page.module.scss";
import Link from "next/link";
import { Footer } from "../../../components/Footer/Footer";
import { getReviewMetadataBySlug } from "../../../services/api/getReviewMetadataBySlug";
import { BlogPosting, WithContext } from "schema-dts";
import { APIReviewType } from "../../../types/api";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getReviewMetadataBySlug(params.slug);
  if (!data) return notFound();
  return {
    title: `Review of ${data?.title}`,
    description: data?.description,
  };
}

const ReviewStructuredData: React.FC<{ post: APIReviewType }> = ({ post }) => {
  const schema: WithContext<BlogPosting> = {
    "@type": "BlogPosting",
    "@context": "https://schema.org",
    headline: post.title,
    description: post.description,
    author: [
      {
        "@type": "Person",
        name: post.author.name,
      },
    ],
    image: `${process.env.NEXT_PUBLIC_CMS_URI}${post.featuredImage?.url}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const siteInfo = await getSiteInfo();
  const review = await getReviewBySlug(params.slug);

  if (!siteInfo || !review) return notFound();

  const published = Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(review?.publishedAt || ""));
  const updated = Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(review?.updatedAt || ""));

  return (
    <main>
      <Nav
        links={siteInfo?.navLinks}
        logo={siteInfo?.logoDark?.formats?.thumbnail}
      />
      <div className={styles["content-wrap"]}>
        <header className={styles["header"]}>
          <div className={styles["header-image"]}>
            <Image
              src={`${process.env.NEXT_PUBLIC_CMS_URI}${review?.featuredImage?.url}`}
              fill
              alt={
                review?.featuredImage?.alternativeText ||
                review?.featuredImage?.caption ||
                review?.featuredImage?.name
              }
            />
          </div>
          <div className={styles["header-content"]}>
            <h1>{review.title}</h1>
            <div className={styles["meta-published"]}>
              <small>Published: {published}</small>
              {published !== updated ? (
                <small>{`Last updated: ${updated}`}</small>
              ) : null}
            </div>
            <span>{review?.description}</span>
          </div>
        </header>
        <div className={styles["author-wrapper"]}>
          <div className={styles["author-left"]}>
            <div className={styles["author-image-wrapper"]}>
              <Image
                src={`${process.env.NEXT_PUBLIC_CMS_URI}${
                  review?.author?.featuredImage.formats?.thumbnail?.url ||
                  review?.author?.featuredImage?.url
                }`}
                alt={
                  review?.author?.featuredImage?.alternativeText ||
                  review?.author?.featuredImage?.caption ||
                  review?.author?.featuredImage?.name
                }
                fill
              />
            </div>
          </div>
          <div className={styles["author-right"]}>
            <h4>{review.author.name}</h4>
            <p>{review.author.tagline}</p>
          </div>
        </div>
        <div className={styles.content}>
          <Content content={review.content} />
        </div>
        <div className={styles["footer-wrapper"]}>
          <div className={styles["gasp-factor"]}>
            <GaspFactorCard
              bloodiness={review.gaspFactor.bloodiness}
              suspense={review.gaspFactor.suspense}
              scariness={review.gaspFactor.scariness}
              stackVertical
            />
          </div>
          <div className={styles["extra-details-wrapper"]}>
            <div className={styles["triggers"]}>
              <h3>Triggers</h3>
              <p>{review.triggers}</p>
            </div>
            <div className={styles["genres"]}>
              <h3>Genres</h3>
              <ul className={styles["genres-list"]}>
                {review.genres.map((genre) => (
                  <li
                    key={`review-page-${genre.id}`}
                    className={styles["genre-wrapper"]}
                  >
                    <Link href={`/genre/${genre.slug}`} title={genre.title}>
                      {genre.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer columns={siteInfo.footerLinkColumns} />
      <ReviewStructuredData post={review} />
    </main>
  );
}

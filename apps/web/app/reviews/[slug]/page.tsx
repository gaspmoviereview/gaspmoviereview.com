import Image from "next/image";
import { Content } from "../../../components/base/content/content";
import { GaspFactorCard } from "../../../components/cards/gasp-factor-card";
import { Nav } from "../../../components/nav/nav";
import { getReviewBySlug } from "../../../services/api/getReviewBySlug";
import { getSiteInfo } from "../../../services/api/getSiteInfo";
import Link from "next/link";
import { Footer } from "../../../components/footer/footer";
import { getReviewMetadataBySlug } from "../../../services/api/getReviewMetadataBySlug";
import { BlogPosting, WithContext } from "schema-dts";
import { APIReviewType } from "../../../types/api";
import { notFound } from "next/navigation";
import { Separator } from "@repo/ui/components/separator";
import { Badge } from "@repo/ui/components/badge";
import { ReviewCard } from "../../../components/cards";

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
      <div className={"max-w-content mx-auto"}>
        <header className={"mt-nav lg:mt-nav-2x"}>
          <div className={"relative min-h-[400px] lg:min-h-[600px] w-full"}>
            <Image
              src={`${process.env.NEXT_PUBLIC_CMS_URI}${review?.featuredImage?.url}`}
              fill
              quality={95}
              className="object-cover"
              alt={
                review?.featuredImage?.alternativeText ||
                review?.featuredImage?.caption ||
                review?.featuredImage?.name
              }
            />
          </div>
          <div className={"grid max-w-header gap-4 mx-auto mt-16 p-8"}>
            <h1>{review.title}</h1>
            <div className={"text-sm mx-auto"}>
              <small>Published: {published}</small>
              {published !== updated ? (
                <small>{`Last updated: ${updated}`}</small>
              ) : null}
            </div>
            <span className="font-light italic">{review?.description}</span>
          </div>
        </header>
        <Separator
          rounding={"lg"}
          variant={"orange"}
          className="max-w-[400px] mx-auto mt-8 mb-4"
          size={"thick-horizontal"}
        />
        <div className={"flex justify-center"}>
          <div className={"p-2"}>
            <div
              className={
                "w-avatar h-avatar relative rounded-full overflow-hidden"
              }
            >
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
          <div className={"flex flex-col my-auto ml-2 gap-0 justify-center"}>
            <h4 className="font-bold text-xl mb-0">{review.author.name}</h4>
            <p className="font-light text-lg mt-0">{review.author.tagline}</p>
          </div>
        </div>
        <Separator
          rounding={"lg"}
          variant={"orange"}
          className="max-w-[400px] mx-auto mt-4"
          size={"thick-horizontal"}
        />
        <div className="p-8">
          <Content content={review.content} />
        </div>
        <Separator />
        <div className={"flex flex-col gap-4 justify-center"}>
          <div className={"max-w-[350px] mx-auto mt-16"}>
            <GaspFactorCard
              size={"lg"}
              bloodiness={review.gaspFactor.bloodiness}
              suspense={review.gaspFactor.suspense}
              scariness={review.gaspFactor.scariness}
            />
          </div>

          <Separator className="my-8" />
          <div className={"flex flex-wrap gap-8 px-8 md:justify-center"}>
            <div className={"flex flex-col max-w-[400px]"}>
              <h3>Triggers</h3>
              <p>{review.triggers}</p>
            </div>
            <div className={"flex flex-col max-w-[400px]"}>
              <h3>Genres</h3>
              <ul className={"flex gap-2"}>
                {review.genres.map((genre) => (
                  <li key={`review-page-${genre.id}`}>
                    <Badge variant={"yellow"}>
                      <Link href={`/genre/${genre.slug}`} title={genre.title}>
                        {genre.title}
                      </Link>
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="max-w-full p-8">
            <h4 className="font-bold mb-8 text-3xl">Related Reviews</h4>
            <div className="flex gap-4 overflow-auto max-w-full">
              {review.relatedReviews.map((review) => (
                <ReviewCard
                  key={`related-${review.id}`}
                  review={review}
                  className="w-120 shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer columns={siteInfo.footerLinkColumns} />
      <ReviewStructuredData post={review} />
    </main>
  );
}

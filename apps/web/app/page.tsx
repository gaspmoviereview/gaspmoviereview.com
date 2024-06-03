import { Content } from "../components/base/content/content";
import { Header } from "../components/header";
import { Nav } from "../components/nav/nav";
import { getLatestReviewCards } from "../services/api/getLatestReviewCards";
import { getPageBySlug } from "../services/api/getPageBySlug";
import { getPageMetadataBySlug } from "../services/api/getPageMetadataBySlug";
import { getSiteInfo } from "../services/api/getSiteInfo";
import { ReviewCard } from "../components/cards/review-card";
import { Footer } from "../components/footer/footer";
import { GenericStructuredData } from "../components/base/generic-structured-data/generic-structured-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Separator } from "@repo/ui/components/separator";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageMetadataBySlug("home");

  if (!data) return notFound();

  return {
    description: data?.description,
  };
}

export default async function Page(): Promise<JSX.Element> {
  const siteInfo = await getSiteInfo();
  const pageData = await getPageBySlug("home");
  const reviews = await getLatestReviewCards();

  if (!siteInfo || !pageData || !reviews) return notFound();

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
      <div className={"grid gap-12 m-auto max-w-content mt-12 px-8"}>
        <Content content={pageData.content} />
        <Separator />
        <ul
          className={"grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"}
        >
          {reviews.data.map((review) => (
            <li key={`hp-review-card-${review.id}`}>
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

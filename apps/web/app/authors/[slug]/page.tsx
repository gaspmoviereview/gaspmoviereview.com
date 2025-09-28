import Image from "next/image";
import { Content } from "../../../components/base/content/content";
import { Nav } from "../../../components/nav/nav";
import { getSiteInfo } from "../../../services/api/getSiteInfo";
import { Footer } from "../../../components/footer/footer";
import { BlogPosting, WithContext } from "schema-dts";
import { APIReviewType } from "../../../types/api";
import { notFound } from "next/navigation";
import { Separator } from "@repo/ui/components/separator";
import { getAuthorBySlug } from "../../../services/api/getAuthorBySlug";
import { getAuthorMetadataBySlug } from "../../../services/api/getAuthorMetadataBySlug";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getAuthorMetadataBySlug(params.slug);
  if (!data) return notFound();
  return {
    title: `${data?.title}`,
    description: data?.description,
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const siteInfo = await getSiteInfo();
  const review = await getAuthorBySlug(params.slug);

  if (!siteInfo || !review) {
    return notFound();
  }

  return (
    <main>
      <Nav
        links={siteInfo?.navLinks}
        logo={siteInfo?.logoDark?.formats?.thumbnail}
      />
      <div className={"max-w-content mx-auto"}>
        <header className={"mt-nav lg:mt-nav-2x"}>
          {review?.featuredImage.formats.small?.url ? (
            <div
              className={
                "relative tex-center mt-28 mx-auto h-[200px] w-[200px] rounded-full overflow-hidden"
              }
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_CMS_URI}${review?.featuredImage.formats?.small?.url}`}
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
          ) : null}
          <div className={"grid max-w-header gap-4 mx-auto text-center p-8"}>
            <h1>{review.name}</h1>
            <span className="font-light italic">{review?.tagline}</span>
          </div>
        </header>
        <Separator
          rounding={"lg"}
          variant={"orange"}
          className="max-w-[400px] mx-auto mb-8"
          size={"thick-horizontal"}
        />
        <div className="p-8">
          <Content content={review.content} />
        </div>
      </div>
      <Footer columns={siteInfo.footerLinkColumns} />
    </main>
  );
}

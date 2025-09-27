import { Content } from "../../components/base/content/content";
import { Nav } from "../../components/nav/nav";
import { getPageBySlug } from "../../services/api/getPageBySlug";
import { getPageMetadataBySlug } from "../../services/api/getPageMetadataBySlug";
import { getSiteInfo } from "../../services/api/getSiteInfo";
import { Footer } from "../../components/footer/footer";
import { GenericStructuredData } from "../../components/base/generic-structured-data/generic-structured-data";
import { ContactForm } from "../../components/contact-form/contact-form";
import { notFound } from "next/navigation";
import { Separator } from "@repo/ui/components/separator";
import Image from "next/image";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPageMetadataBySlug(params.slug);
  if (!data) return notFound();

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const siteInfo = await getSiteInfo();
  const pageData = await getPageBySlug(params?.slug);

  if (!siteInfo || !pageData) return notFound();

  return (
    <main>
      <Nav
        links={siteInfo.navLinks}
        logo={siteInfo.logoDark.formats.thumbnail}
      />
      <header className={"mt-nav lg:mt-nav"}>
        {pageData.featuredImage?.url ? (
          <div className={"relative min-h-[400px] lg:min-h-[600px] w-full"}>
            <Image
              src={`${process.env.NEXT_PUBLIC_CMS_URI}${pageData?.featuredImage?.url}`}
              fill
              quality={95}
              className="object-cover"
              alt={
                pageData.featuredImage?.alternativeText ||
                pageData.featuredImage?.caption ||
                pageData.featuredImage?.name
              }
            />
          </div>
        ) : null}
        <div className={"grid max-w-header gap-4 mx-auto mt-16 p-8"}>
          <h1>{pageData.title}</h1>
          <span className="font-light text-center italic">
            {pageData.description}
          </span>
        </div>
      </header>
      <Separator
        variant={"orange"}
        className="max-w-[400px] mx-auto mb-16"
        size={"thick-horizontal"}
        rounding={"lg"}
      />
      <div className={"px-8 max-w-content mx-auto min-h-[calc(100vh_/_2)]"}>
        <Content content={pageData.content} />
      </div>
      {pageData.isContact ? (
        <div className={"max-w-content"}>
          <ContactForm />
        </div>
      ) : null}
      <Footer columns={siteInfo.footerLinkColumns} />
      <GenericStructuredData page={pageData} />
    </main>
  );
}

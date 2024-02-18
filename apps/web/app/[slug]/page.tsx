import { Content } from "../../components/Base/Content/Content";
import { Nav } from "../../components/Nav/Nav";
import { getPageBySlug } from "../../services/api/getPageBySlug";
import { getPageMetadataBySlug } from "../../services/api/getPageMetadataBySlug";
import { getSiteInfo } from "../../services/api/getSiteInfo";
import styles from "./page.module.scss";
import { Footer } from "../../components/Footer/Footer";
import { GenericStructuredData } from "../../components/Base/GenericStructuredData/GenericStructuredData";
import { ContactForm } from "../../components/ContactForm/ContactForm";
import { notFound } from "next/navigation";

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
      <header className={styles["header"]}>
        <div className={styles["header-content"]}>
          <h1>{pageData.title}</h1>
          <span>{pageData.description}</span>
        </div>
      </header>
      <div className={styles.content}>
        <Content content={pageData.content} />
      </div>
      {pageData.isContact ? (
        <div className={styles["contact-wrapper"]}>
          <ContactForm />
        </div>
      ) : null}
      <Footer columns={siteInfo.footerLinkColumns} />
      <GenericStructuredData page={pageData} />
    </main>
  );
}

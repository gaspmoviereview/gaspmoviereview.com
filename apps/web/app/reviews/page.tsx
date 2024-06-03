import { Nav } from "../../components/nav/nav";
import { getLatestReviewCards } from "../../services/api/getLatestReviewCards";
import { getPageMetadataBySlug } from "../../services/api/getPageMetadataBySlug";
import { getSiteInfo } from "../../services/api/getSiteInfo";
import { ReviewCard } from "../../components/cards/review-card";
import { Footer } from "../../components/footer/footer";
import { notFound } from "next/navigation";
import { Separator } from "@repo/ui/components/separator";
import {
  PaginationContent,
  PaginationItem,
  Pagination,
} from "@repo/ui/components/pagination";
import { AnchorLink } from "../../components/base";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const data = await getPageMetadataBySlug("reviews");
  if (!data) return notFound();

  return {
    description: data?.description,
  };
}

export default async function Page({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { page: number };
}): Promise<JSX.Element> {
  const page = searchParams?.page ? Number(searchParams?.page) : 1;
  const siteInfo = await getSiteInfo();

  const { data: reviews, meta } = await getLatestReviewCards(page);

  if (!siteInfo || !reviews) return notFound();

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
      <header className="mt-nav py-12 px-6 max-w-header text-center mx-auto">
        <div className={"grid gap-4 w-6/7 mx-auto"}>
          <h1 className="font-bold">
            Reviews{" "}
            <span className="font-light block text-sm">
              (Page {searchParams?.page || "1"})
            </span>
          </h1>
          <p className="font-light font-courier">
            Currently displaying posts{" "}
            {firstPostOnPage === 0 ? 1 : firstPostOnPage} to {lastPostOnPage}{" "}
            from all genres. There are a total of {meta.pagination.total} posts.
          </p>
        </div>
      </header>
      <Separator
        className="max-w-[400px] mx-auto w-4/5"
        variant={"orange"}
        size={"thick-horizontal"}
        rounding={"lg"}
      />
      <div className="py-16 max-w-content mx-auto">
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 justify-center gap-8">
          {reviews.map((review) => (
            <li key={`plp-review-card-${review.id}`}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>
      {meta.pagination.pageCount > 1 ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <AnchorLink
                href={`/reviews?page=${meta.pagination.page - 1}`}
                title={`Go to page ${meta.pagination.page - 1}`}
                className={
                  meta.pagination.page === 1
                    ? "pointer-events-none touch-none opacity-50"
                    : "cursor-pointer"
                }
              >
                Previous
              </AnchorLink>
            </PaginationItem>
            <PaginationItem>
              <AnchorLink
                href={`/reviews/?page=${meta.pagination.page + 1}`}
                title={`Go to page ${meta.pagination.page + 1}`}
                className={
                  meta.pagination.page === meta.pagination.pageCount
                    ? "pointer-events-none touch-none opacity-50"
                    : "cursor-pointer"
                }
              >
                Next
              </AnchorLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
      <Footer columns={siteInfo.footerLinkColumns} />
    </main>
  );
}

import { Nav } from "../../../components/nav/nav";
import { getSiteInfo } from "../../../services/api/getSiteInfo";
import { Footer } from "../../../components/footer/footer";
import { getGenreBySlug } from "../../../services/api/getGenreBySlug";
import { ReviewCard } from "../../../components/cards/review-card";
import { getReviewsByGenre } from "../../../services/api/getReviewsByGenre";
import { notFound } from "next/navigation";
import { Separator } from "@repo/ui/components/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@repo/ui/components/pagination";
import { AnchorLink } from "../../../components/base";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string; genre: string[] };
  searchParams?: { page?: number };
}) {
  const genreData = await getGenreBySlug(`${params.genre[0]}`);
  if (!genreData) return notFound();

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

  if (!siteInfo || !genreData || !reviews) return notFound();

  return (
    <main>
      <Nav
        links={siteInfo.navLinks}
        logo={siteInfo.logoDark.formats.thumbnail}
      />
      <header className="mt-nav py-12 px-6 max-w-header text-center mx-auto">
        <div className={"grid gap-4 w-6/7 mx-auto"}>
          <h1 className="font-bold">
            {`${genreData.title} Reviews`}
            <span className="font-light block text-sm">
              (Page {meta.pagination.page})
            </span>
          </h1>
          <p className="font-light font-courier">
            Currently displaying posts{" "}
            {meta.pagination.page === 1
              ? 1
              : meta.pagination.page * meta.pagination.pageSize + 1}{" "}
            to{" "}
            {meta.pagination.total < meta.pagination.pageSize
              ? meta.pagination.total
              : meta.pagination.page * meta.pagination.pageSize}{" "}
            from the <strong>{genreData.title.toLowerCase()}</strong> genre.
            There are a total of {meta.pagination.total} posts.
          </p>
        </div>
      </header>
      <Separator
        className="max-w-[400px] mx-auto w-4/5"
        variant={"orange"}
        size={"thick-horizontal"}
        rounding={"lg"}
      />
      <div className="py-16 max-w-content mx-auto px-8">
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
                href={`/reviews/${genreData.slug}?page=${meta.pagination.page - 1}`}
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
                href={`/reviews/${genreData.slug}?page=${meta.pagination.page + 1}`}
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

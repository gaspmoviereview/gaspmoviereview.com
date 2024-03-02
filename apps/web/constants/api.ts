export const SITE_INFO_QUERY_PARAMS =
  "fields[0]=name&fields[1]=tagline&fields[2]=email&populate[logoLight]=*&populate[logoDark]=*&populate[socialShareImage]=*&populate[footerLinkColumns][fields][0]=title&populate[footerLinkColumns][populate][links]=*&populate[navLinks]=*";

export const PAGE_QUERY_PARAMS =
  "fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=content&fields[4]=isContact&populate[featuredImage]=*";

export const PAGE_METADATA_QUERY_PARAMS =
  "fields[0]=title&fields[1]=slug&fields[2]=description";

export const REVIEW_METADATA_QUERY_PARAMS =
  "fields[0]=title&fields[1]=slug&fields[2]=description";

export const REVIEW_QUERY_PARAMS =
  "fields[0]=title&fields[1]=description&fields[2]=content&fields[3]=publishedAt&fields[4]=updatedAt&fields[5]=slug&fields[6]=triggers&populate[genres]=*&populate[featuredImage]=*&populate[author][fields][0]=name&populate[author][fields][1]=slug&populate[author][fields][2]=tagline&populate[author][populate][featuredImage]=*&populate[relatedReviews][populate][fields][0]=title&populate[relatedReviews][populate][fields][1]=description&populate[relatedReviews][populate][fields][2]=slug&populate[relatedReviews][populate][featuredImage]=*&populate[relatedReviews][populate][gaspFactor]=*&populate[gaspFactor]=*";

export const REVIEW_CARD_QUERY_PARAMS =
  "fields[0]=title&fields[1]=description&fields[3]=publishedAt&fields[5]=slug&populate[genre]=*&populate[featuredImage]=*&populate[gaspFactor]=*";

export const GENRE_QUERY_PARAMS = "fields[0]=title&fields[1]=slug";

export const CMS_FETCH_OPTIONS = {
  method: "GET",
  headers: {
    authorization: `Bearer ${process.env.CMS_ACCESS_TOKEN}`,
  },
  next: {
    revalidate: 3600, // 1 hour
  },
};

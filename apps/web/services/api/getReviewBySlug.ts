import { CMS_FETCH_OPTIONS, REVIEW_QUERY_PARAMS } from "../../constants/api";
import { APIReviewType } from "../../types/api";

export const getReviewBySlug = async (slug: string): Promise<APIReviewType> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/reviews?filters[slug][$eqi]=${slug}&${REVIEW_QUERY_PARAMS}`,
    CMS_FETCH_OPTIONS
  );

  const res = await req.json();

  return res.data?.[0];
};

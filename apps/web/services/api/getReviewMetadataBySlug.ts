import {
  CMS_FETCH_OPTIONS,
  REVIEW_METADATA_QUERY_PARAMS,
} from "../../constants/api";
import { APIPageMetadataType } from "../../types/api";

export const getReviewMetadataBySlug = async (
  slug: string
): Promise<APIPageMetadataType> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/reviews?filters[slug][$eqi]=${slug}&${REVIEW_METADATA_QUERY_PARAMS}`,
    CMS_FETCH_OPTIONS
  );

  const res = await req.json();

  return res.data?.[0];
};

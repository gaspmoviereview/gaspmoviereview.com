import {
  AUTHOR_METADATA_QUERY_PARAMS,
  CMS_FETCH_OPTIONS,
} from "../../constants/api";
import { APIPageMetadataType } from "../../types/api";

export const getAuthorMetadataBySlug = async (
  slug: string
): Promise<APIPageMetadataType | null> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/authors?filters[slug][$eqi]=${slug}&${AUTHOR_METADATA_QUERY_PARAMS}`,
    CMS_FETCH_OPTIONS
  );

  const res = await req.json();

  return res.data?.[0]
    ? {
        title: res.data?.[0]?.name,
        description: res.data?.[0].tagline,
        slug: res.data?.[0].slug,
      }
    : null;
};

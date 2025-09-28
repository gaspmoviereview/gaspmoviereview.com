import { AUTHOR_QUERY_PARAMS, CMS_FETCH_OPTIONS } from "../../constants/api";
import { APIAuthorType } from "../../types/api";

export const getAuthorBySlug = async (slug: string): Promise<APIAuthorType> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/authors?filters[slug][$eqi]=${slug}&${AUTHOR_QUERY_PARAMS}`,
    CMS_FETCH_OPTIONS
  );
  const res = await req.json();

  return res.data?.[0];
};

import { CMS_FETCH_OPTIONS, GENRE_QUERY_PARAMS } from "../../constants/api";
import { APIReviewCardType } from "../../types/api";

type APIGenreType = {
  id: number;
  title: string;
  slug: string;
  description: string;
  reviews: APIReviewCardType[];
};

export const getGenreBySlug = async (slug: string): Promise<APIGenreType> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/genres?filters[slug][$eqi]=${slug}&${GENRE_QUERY_PARAMS}`,
    CMS_FETCH_OPTIONS
  );
  const res = await req.json();
  return res.data?.[0];
};

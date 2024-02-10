import {
  CMS_FETCH_OPTIONS,
  REVIEW_CARD_QUERY_PARAMS,
} from "../../constants/api";
import { APIMetaDataType, APIReviewCardType } from "../../types/api";

export const getReviewsByGenre = async (
  genre: string,
  page: number = 1,
  offset: number = 6
): Promise<{ data: APIReviewCardType[]; meta: APIMetaDataType }> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/reviews?filters[genres][slug][$eqi]=${genre}&pagination[page]=${page}&pagination[pageSize]=${offset}&sort[0]=publishedAt&${REVIEW_CARD_QUERY_PARAMS}`,
    CMS_FETCH_OPTIONS
  );

  const res = await req.json();

  return res;
};

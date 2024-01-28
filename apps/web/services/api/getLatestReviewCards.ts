import {
  CMS_FETCH_OPTIONS,
  REVIEW_CARD_QUERY_PARAMS,
} from "../../constants/api";
import { APIReviewCardType } from "../../types/api";

export const getLatestReviewCards = async (
  page: number = 1,
  offset: number = 12
): Promise<APIReviewCardType[]> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/reviews?pagination[page]=${page}&pagination[pageSize]=${offset}&sort[0]=publishedAt&${REVIEW_CARD_QUERY_PARAMS}`,
    CMS_FETCH_OPTIONS
  );

  const res = await req.json();

  return res.data;
};

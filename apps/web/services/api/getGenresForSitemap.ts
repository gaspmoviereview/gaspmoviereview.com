import { CMS_FETCH_OPTIONS } from "../../constants/api";

export const getGenresForSitemap = async (): Promise<{
  data: { slug: string }[];
}> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/genres?sort[0]=publishedAt&fields[0]=slug`,
    CMS_FETCH_OPTIONS
  );

  const res = await req.json();

  return res;
};

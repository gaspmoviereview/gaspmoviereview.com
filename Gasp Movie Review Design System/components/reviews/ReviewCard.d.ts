/** Image-led review card: 16:10 still with a glowing Gasp badge, serif title, 3-line excerpt, compact stats footer. Whole card is the link. */
export interface ReviewCardProps {
  /** "Title (Year)" */
  title: string;
  excerpt: string;
  image: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  gasp?: { score: number; suspense: number; scariness: number; bloodiness: number };
  style?: React.CSSProperties;
}
export declare function ReviewCard(props: ReviewCardProps): JSX.Element;
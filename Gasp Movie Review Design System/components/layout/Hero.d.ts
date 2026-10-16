/** Full-bleed film-still hero with bottom + left scrims; red mono eyebrow, Gasp badge, huge serif title, excerpt and actions. */
export interface HeroProps {
  image: string;
  eyebrow?: string;
  title: React.ReactNode;
  excerpt?: string;
  gasp?: { score: number; suspense: number; scariness: number; bloodiness: number };
  /** Usually <Button>s */
  actions?: React.ReactNode;
  minHeight?: string;
}
export declare function Hero(props: HeroProps): JSX.Element;
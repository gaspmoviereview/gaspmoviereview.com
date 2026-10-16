/** Near-black footer with a soft navy glow: logo, tagline, Instagram, link columns, mono credit row. */
export interface SiteFooterProps {
  assetBase?: string;
  links?: string[];
  genres?: string[];
  onNavigate?: (link: string) => void;
}
export declare function SiteFooter(props: SiteFooterProps): JSX.Element;
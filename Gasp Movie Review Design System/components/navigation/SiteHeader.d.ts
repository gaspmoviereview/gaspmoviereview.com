/** Sticky glass header: white logo, inline nav with glowing red underline on desktop; hamburger + big serif menu on mobile. */
export interface SiteHeaderProps {
  assetBase?: string;
  menuOpen?: boolean;
  onMenuToggle?: () => void;
  links?: string[];
  /** Currently active link label */
  current?: string;
  onNavigate?: (link: string) => void;
  onHome?: () => void;
  /** Force mobile (true) or desktop (false) layout; default is width < 760 */
  compact?: boolean;
}
export declare function SiteHeader(props: SiteHeaderProps): JSX.Element;
/** Gasp Movie Review wordmark (PNG). Light (white) is the default on the dark system. */
export interface LogoProps {
  /** light = white, for dark surfaces (default); dark = navy, for rare light surfaces */
  variant?: 'light' | 'dark';
  /** px width. Header 64, hero/footer 160–220. */
  width?: number;
  /** Relative path from page to DS root, e.g. "../../" */
  assetBase?: string;
  alt?: string;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
/** Outlined pill for genres. active = navy fill with a soft navy glow (selected filter). */
export interface GenreTagProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
}
export declare function GenreTag(props: GenreTagProps): JSX.Element;
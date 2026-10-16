/** Pill button. primary = glowing Gasp Red; ghost = glassy outline over imagery; link = bare text + arrow. */
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'link';
  size?: 'md' | 'sm';
  /** Tabler icon name without prefix, e.g. "arrow-right" */
  icon?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
/** Compact author line: round avatar, name · role, optional mono meta (dates). */
export interface AuthorBylineProps {
  name: string;
  role: string;
  avatar: string;
  href?: string;
  /** e.g. "1 Apr 2024 · Updated 21 Oct 2025" */
  meta?: string;
}
export declare function AuthorByline(props: AuthorBylineProps): JSX.Element;
/** 44px round social link; glows red on hover. */
export interface SocialButtonProps {
  /** Icon class, default Tabler brand-instagram */
  icon?: string;
  href?: string;
  label?: string;
}
export declare function SocialButton(props: SocialButtonProps): JSX.Element;
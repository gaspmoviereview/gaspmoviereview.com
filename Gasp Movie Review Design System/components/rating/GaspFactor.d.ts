/** The signature rating. badge = glowing score pill over imagery; compact = inline icon stats; full = big serif score + three glowing meters. */
export interface GaspFactorProps {
  /** Average 0–10, shown with 2 decimals */
  score: number;
  /** 0–100, grimace icon */
  suspense: number;
  /** 0–100, surprised-face icon */
  scariness: number;
  /** 0–100, droplets icon */
  bloodiness: number;
  size?: 'badge' | 'compact' | 'full';
  caption?: string;
}
export declare function GaspFactor(props: GaspFactorProps): JSX.Element;
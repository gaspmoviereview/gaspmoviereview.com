/** Dark text input / textarea with mono uppercase label, hint or error line; navy focus glow, red error ring. */
export interface TextFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: 'text' | 'email';
  /** Render a textarea */
  multiline?: boolean;
  rows?: number;
  /** Helper copy, e.g. "Minimum 3 letters" */
  hint?: string;
  /** Replaces hint and turns the ring red */
  error?: string;
  placeholder?: string;
  required?: boolean;
}
export declare function TextField(props: TextFieldProps): JSX.Element;
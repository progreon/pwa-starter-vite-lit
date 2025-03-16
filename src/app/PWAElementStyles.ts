import { css, unsafeCSS } from 'lit';
import tailwindcss from 'tailwindcss?inline';
/* @import "tailwindcss"; */

export const PWAElementStyles = css`
  ${unsafeCSS(tailwindcss)}
  :host {
    border: 1px solid red;
  }
`;

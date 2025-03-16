import { LitElement, css, html, CSSResultGroup, unsafeCSS } from 'lit';
import pwastyles from '@styles/pwastyles.css?inline';
// import { PWAElementStyles } from './PWAElementStyles';

export class PWAElement extends LitElement {
  static styles: CSSResultGroup = [unsafeCSS(pwastyles)];
}
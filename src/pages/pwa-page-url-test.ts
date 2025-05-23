import { TemplateResult, CSSResultGroup, LitElement, css, html, unsafeCSS } from 'lit-element'
import { customElement, property } from 'lit/decorators.js'
import { PwaPage } from './PwaPage';
import { AppState } from '@/core/store/store';

@customElement('pwa-page-url-test')
export class PwaPageUrlTest extends PwaPage {

  @property({ type: Object })
  private searchParams: URLSearchParams;
  @property({ type: String })
  private hash: string;

  static styles = [
    // unsafeCSS(pwastyles),
    css`
      /* :host {
        display: block;
        padding: 16px;
      } */
    `
  ];

  protected _render(): unknown {
    return html`
      <h2>Thanks for clicking on Test 2!</h2>
      <p>This time we're also showing the url search parameters and hash!</p>
      <p>Click <a href="${this.href}?p1=foo&p2=bar#asdf">here</a> to add those to the url</p>
      <hr>
      <p>Search: ${this.searchParams?.toString()}</p>
      <p>Hash: ${this.hash}</p>
    `
  }

  protected _stateChanged(state: AppState): void {
    super._stateChanged(state);
    this.searchParams = new URLSearchParams(state.router.search);
    this.hash = state.router.hash;
  }
}

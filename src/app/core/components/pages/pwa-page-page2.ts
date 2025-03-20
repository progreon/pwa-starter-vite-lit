import { TemplateResult, CSSResultGroup, LitElement, css, html, unsafeCSS } from 'lit-element'
import { customElement, property } from 'lit/decorators.js'
import { PwaPage } from './PwaPage';
import { PwaState } from '@/shared/modules/redux';

@customElement('pwa-page-page2')
export class PwaPagePage2 extends PwaPage {

  @property({ type: Object })
  private searchParams: URLSearchParams;
  @property({ type: String })
  private hash: string;

  protected _render(): unknown {
    return html`
      <h2>Thanks for clicking on Test 2!</h2>
      <p>This time we're also showing the url search parameters and hash!</p>
      <p>Click <a href="${this.href}?p1=foo&p2=bar#asdf">here</a> to add those to the url</p>
      <hr>
      <p>Search: ${this.searchParams.toString()}</p>
      <p>Hash: ${this.hash}</p>
    `
  }

  protected _stateChanged(state: PwaState): void {
    super._stateChanged(state);
    this.searchParams = new URLSearchParams(state.router.search);
    this.hash = state.router.hash;
  }
}

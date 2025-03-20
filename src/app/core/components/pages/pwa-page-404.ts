import { TemplateResult, CSSResultGroup, LitElement, css, html, unsafeCSS } from 'lit-element'
import { customElement, property } from 'lit/decorators.js'
import { PwaPage } from './PwaPage';

@customElement('pwa-page-404')
export class PwaPage404 extends PwaPage {
  _render() {
    return html`
      <h2>Oops! You hit a 404</h2>
      <p>The page you're looking for doesn't seem to exist. Head back
          <a href="/home">home</a> and try again?
      </p>
    `
  }
}

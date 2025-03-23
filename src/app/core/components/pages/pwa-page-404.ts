import { TemplateResult, CSSResultGroup, LitElement, css, html, unsafeCSS } from 'lit-element'
import { customElement, property } from 'lit/decorators.js'
import { PwaPage } from './PwaPage';
import jpgUnlit from '@images/unlit.jpg';

@customElement('pwa-page-404')
export class PwaPage404 extends PwaPage {
  _render() {
    return html`
      <h2>Oops! You hit a 404</h2>
      <p>The page you're looking for doesn't seem to exist. Head back
          <a href="/vite-pwa/">home</a> and try again?
      </p>
      <img src="${jpgUnlit}" alt="">
    `
  }

  static styles = css`
    img {
      width: 100%;
      /* height: 2em; */
    }
  `
}

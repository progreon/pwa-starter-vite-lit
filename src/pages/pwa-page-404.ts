import { css, html, unsafeCSS } from 'lit-element'
import { customElement } from 'lit/decorators.js'
import { PwaPage } from './PwaPage';

// import pwastyles from '@/pwastyles.css?inline';
import jpgUnlit from '@images/unlit.jpg';

@customElement('pwa-page-404')
export class PwaPage404 extends PwaPage {

  static styles = [
    // unsafeCSS(pwastyles),
    css`
      img {
        width: 100%;
        /* height: 2em; */
      }
    `
  ];

  _render() {
    return html`
      <h2>Oops! You hit a 404</h2>
      <p>The page you're looking for doesn't seem to exist. Head back
          <a href="/vite-pwa/">home</a> and try again?
      </p>
      <img src="${jpgUnlit}" alt="">
    `
  }
}

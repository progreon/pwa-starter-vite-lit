import { css, html, unsafeCSS } from 'lit-element'
import { customElement } from 'lit/decorators.js'
import { PwaPage } from './PwaPage';

// import pwastyles from '@/pwastyles.css?inline';
import jpgUnlit from '@images/unlit.jpg';

@customElement('pwa-page-401')
export class PwaPage401 extends PwaPage {

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
      <h2>Unauthorized</h2>
      <p>It seems you're not authorized to see this page. Head back
          <a href=${window.MyAppGlobals.rootPath}>login</a> and try again?
      </p>
      <img src="${jpgUnlit}" alt="">
    `
  }
}

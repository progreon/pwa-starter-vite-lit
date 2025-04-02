import { css, html, unsafeCSS } from 'lit-element'
import { customElement } from 'lit/decorators.js'
import { PwaPage } from './PwaPage';

import 'src/components/todo-list/todo-adder';
import 'src/components/todo-list/todo-viewer';

// import pwastyles from '@/pwastyles.css?inline';

@customElement('pwa-page-home')
export class PwaPageHome extends PwaPage {

  static styles = [
    // unsafeCSS(pwastyles),
    css`
      /* :host {
        display: block;
        padding: 16px;
      } */
    `
  ];

  _render() {
    return html`
      <h1>Hello Vite/Lit/TS World!</h1>
      <p>You are on page: <b>${this.app.page}</b></p>
      <hr>
      <p>You can add some todo's here, which are shown on Page 1:</p>
      <todo-adder></todo-adder>
      <hr>
      <todo-viewer></todo-viewer>
    `
  }
}

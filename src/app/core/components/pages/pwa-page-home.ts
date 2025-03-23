import { TemplateResult, CSSResultGroup, LitElement, css, html, unsafeCSS } from 'lit-element'
import { customElement, property } from 'lit/decorators.js'
import { PwaPage } from './PwaPage';

import '@components/todo-list/todo-adder';
import '@components/todo-list/todo-viewer';

@customElement('pwa-page-home')
export class PwaPageHome extends PwaPage {
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

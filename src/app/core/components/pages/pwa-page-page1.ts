import { TemplateResult, CSSResultGroup, LitElement, css, html, unsafeCSS } from 'lit-element'
import { customElement, property } from 'lit/decorators.js'
import { PwaPage } from './PwaPage';

import '@components/todo-list/todo-viewer';

@customElement('pwa-page-page1')
export class PwaPagePage1 extends PwaPage {
  _render() {
    return html`
      <h2>Thanks for clicking on Test 1!</h2>
      <p>You are now viewing the first test page of this app ;)</p>
      <hr>
      <p>Here you can see the todo's you added:</p>
      <todo-viewer></todo-viewer>
    `
  }
}

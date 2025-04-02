import { css, html, unsafeCSS } from 'lit-element'
import { customElement } from 'lit/decorators.js'
import { PwaPage } from './PwaPage';

// import pwastyles from '@/pwastyles.css?inline';

import 'src/components/todo-list/todo-viewer';

@customElement('pwa-page-page1')
export class PwaPagePage1 extends PwaPage {

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
      <h2>Thanks for clicking on Test 1!</h2>
      <p>You are now viewing the first test page of this app ;)</p>
      <hr>
      <p>Here you can see the todo's you added:</p>
      <todo-viewer></todo-viewer>
    `
  }
}

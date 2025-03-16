import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@pwaMenu/pwa-menu-bar';

@customElement('pwa-app')
export class PwaApp extends LitElement {

  @property({type: String})
  private page: string = 'home';
  @property({type: Number})
  private clickCount = 0;

  static styles = css`
  `;

  render() {
    return html`
      <h1>Hello Vite/Lit/TS world!</h1>
      <p>You are on page: ${this.page}</p>
      <p><button @click=${() => this.clickCount++}>This button</button> has been clicked ${this.clickCount} times.</p>
    `
  }

}
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { PwaMenuItem } from '@modules/pwa/PwaMenuItem';

// Component imports for this element
import './pwa-menu-bar-item';

// These are the shared styles needed by this element.
import { AppStyles } from '@styles/app-styles';

@customElement('pwa-menu-bar')
export class PwaMenuBar extends LitElement {

  @property({type: Array})
  public menuItems: PwaMenuItem[];
  @property({type: String})
  public selectedItem: string;

  static styles = css`
    ${AppStyles}
    .menu-bar {
      display: flex;
    }
  `;

  render() {
    let linkList = [];
    if (this.menuItems) {
      this.menuItems.forEach(mi => {
        const a = html`<pwa-menu-bar-item .menuItem="${mi}" .selectedItem="${this.selectedItem}"></pwa-menu-bar-item>`;
        linkList.push(a);
      });
    }
    return html`
      <div class="menu-bar">
        ${linkList}
      </div>
    `;
  }
}

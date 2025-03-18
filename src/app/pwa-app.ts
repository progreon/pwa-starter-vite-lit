// Inspiration: https://www.geeksforgeeks.org/create-a-single-page-application-using-html-css-javascript/
import { CSSResultGroup, LitElement, css, html, unsafeCSS } from 'lit-element'
import { customElement, property } from 'lit/decorators.js'

// redux
import { store, ConnectMixin, PwaState, installRouter } from '@redux';

// styles
import pwastyles from '@styles/pwastyles.css?inline';

// import '@pwaMenu/pwa-menu-bar';

interface TempNav {
  page: string
  href: string
  title: string
  subnav?: TempNav[]
}

@customElement('pwa-app')
export class PwaApp extends ConnectMixin(store)(LitElement) {

  @property({ type: String })
  private page: string = 'home';
  @property({ type: Array })
  private tempnav: TempNav[] = [
    { page: 'home', href: '/vite-lit/', title: 'Home' },
    { page: 'test1', href: '/vite-lit/test1', title: 'Test 1' },
    {
      page: 'test2', href: '/vite-lit/test2?p1=foo&p2=bar#asdf', title: 'Test 2', subnav: [
        { page: 'test2/sub', href: '/vite-lit/test2/sub', title: 'Sub' }
      ]
    }
  ];

  private _renderTempNavUl(tempNav: TempNav[]) {
    return html`
      <ul>
        ${tempNav.map(nav => html`
          <li>
            <a href='${nav.href}'>${nav.title}</a>
            ${nav.subnav ? this._renderTempNavUl(nav.subnav) : html``}
          </li>
        `)}
      </ul>
    `;
  }

  render() {
    return html`
      <header>
        <h1>This is the header</h1>
        <h3>And this is a sub-header</h3>
      </header>
      <nav>
        ${this._renderTempNavUl(this.tempnav)}
      </nav>
      <main>
        <h1>Hello Vite/Lit/TS world!</h1>
        <p>You are on page: ${this.page}</p>
      </main>
    `;
  }

  static styles: CSSResultGroup = [unsafeCSS(pwastyles), css`
    * {
      border: 1px solid brown;
    }
  `];

  connectedCallback(): void {
    super.connectedCallback();
    installRouter(store, 'home', '/vite-lit');
  }

  protected _stateChanged(state: PwaState): void {
    this.page = state.router.page;
  }

}

// declare global {
//   interface HTMLElementTagNameMap {
//     'pwa-app': PwaApp
//   }
// }

// Inspiration: https://www.geeksforgeeks.org/create-a-single-page-application-using-html-css-javascript/
import { CSSResultGroup, LitElement, css, html, unsafeCSS } from 'lit-element'
import { customElement, property } from 'lit/decorators.js'

// redux
import { store, AppState } from '@/core/store/store';
import { ConnectMixin } from '@store/connectMixin';

// routing
import { PwaRoute, PwaRouteMap, PwaRoutes } from './pwa-router';

// styles
import pwastyles from './pwastyles.css?inline';
import { PwaPage404 } from '@pages/pwa-page-404';
import { PwaPagePage1 } from '@pages/pwa-page-page1';
import { PwaPagePage2 } from '@pages/pwa-page-page2';
import { PwaPageHome } from '@pages/pwa-page-home';
import { installRouter } from '@/core/store/router';

// import '@pwaMenu/pwa-menu-bar';

@customElement('pwa-app')
export class PwaApp extends ConnectMixin(store)(LitElement) {

  @property({ type: String })
  public page: string = 'home';
  private readonly rootNav: PwaRoutes = new PwaRoutes('/vite-pwa', 'test title', {
    'home': new PwaRoute('Home', new PwaPageHome(this)),
    'test1': new PwaRoute('Test 1', new PwaPagePage1(this)),
    'test2': new PwaRoute('Test 2', new PwaPagePage2(this))
  }, new PwaRoute('404 - Page Not Found', new PwaPage404(this)));

  private _renderNavMapUl(navMap: PwaRouteMap) {
    return html`
      <ul>
        ${Object.keys(navMap).filter(key => navMap[key].showInMenu).map(key => {
      const nav = navMap[key];
      return html`
          <li>
            <a href='${nav.href}'>${nav.title}</a>
            ${nav.routes && this._renderNavMapUl(nav.routes)}
          </li>
        `;
    })}
      </ul>
    `;
  }

  render() {
    return html`
      <header>
        <h1>Vite PWA</h1>
        <h3>Making a PWA with Vite & Lit</h3>
      </header>
      <nav>
        ${this._renderNavMapUl(this.rootNav.routes)}
      </nav>
      <main>
        <div class="page">
          ${this.rootNav.getPage(this.page)}
        </div>
      </main>
    `;
  }

  static styles: CSSResultGroup = [unsafeCSS(pwastyles), css`
    /* * {
      border: 1px solid brown;
    } */

    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    header {
      background-color: darkslategray;
      color: lightgray;
      text-align: center;
      padding: 1em;
    }

    nav {
      background-color: slategray;
      display: flex;
      justify-content: center;
    }

    nav ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: flex;
      /* justify-content: center; */
    }

    nav li {
      margin: 0;
    }

    nav a {
      text-decoration: none;
      color: lightgray;
      padding: 1em;
      display: block;
      transition: background-color 0.3s ease;
    }

    nav a:hover {
      background-color: darkolivegreen;
    }

    main {
      flex: 1;
      padding: 1em;
    }

    .page {
      max-width: 1000px;
      margin: 0 auto;
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px gray;
    }
  `];

  connectedCallback(): void {
    super.connectedCallback();
    installRouter(store, 'home', '/vite-pwa');
  }

  protected _stateChanged(state: AppState): void {
    this.page = state.router.page;
  }

}

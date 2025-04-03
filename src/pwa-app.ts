// Inspiration: https://www.geeksforgeeks.org/create-a-single-page-application-using-html-css-javascript/
import { CSSResultGroup, LitElement, css, html, unsafeCSS } from 'lit-element'
import { customElement, property } from 'lit/decorators.js'

// redux
import { store, AppState } from '@/core/store/store';
import { ConnectMixin } from '@store/connectMixin';
import { addAuthorizations, removeAuthorizations } from '@/core/store/actions/authorizations';

// routing
import { PwaRoute, PwaRouteMap, PwaRoutes } from './pwa-router';
import { installRouter } from '@/core/store/router';

// styles
import pwastyles from './pwastyles.css?inline';

// pages
import { PwaPage404 } from '@pages/pwa-page-404';
import { PwaPage401 } from '@pages/pwa-page-401';
import { PwaPageTodo } from '@/pages/pwa-page-todo';
import { PwaPageUrlTest } from '@/pages/pwa-page-url-test';
import { PwaPageHome } from '@pages/pwa-page-home';

// import '@pwaMenu/pwa-menu-bar';

@customElement('pwa-app')
export class PwaApp extends ConnectMixin(store)(LitElement) {

  @property({ type: String })
  public page: string = 'home';
  @property({ type: Array })
  public authorizations: string[] = [];

  private readonly siteMap: PwaRoutes = new PwaRoutes(window.MyAppGlobals.rootPath, 'test title', {
      'home': new PwaRoute('Home', new PwaPageHome(this)),
      'todo': new PwaRoute('Todo', new PwaPageTodo(this), ['VIEW_TODO']),
      'url-test': new PwaRoute('URL Test', new PwaPageUrlTest(this))
    },
    new PwaRoute('404 - Page Not Found', new PwaPage404(this)),
    new PwaRoute('401 - Unauthorized', new PwaPage401(this))
  );

  private _renderNavMapUl(routes: PwaRouteMap, authorizations: string[] = [], mayViewAllPages = false): unknown {
    return html`
      <ul>
        ${Object.keys(routes).filter(key => routes[key].showInMenu && routes[key].isAuthorized(authorizations, mayViewAllPages)).map(key => {
          const route = routes[key];
          return html`
            <li>
              <a href='${route.href}'>${route.title}</a>
              ${route.subRoutes && this._renderNavMapUl(route.subRoutes, authorizations, mayViewAllPages)}
            </li>
          `;
        })}
      </ul>
    `;
  }

  render() {
    console.debug('render', this.page, this.authorizations);
    return html`
      <header>
        <h1>Vite PWA</h1>
        <h3>Making a PWA with Vite & Lit</h3>
      </header>
      <nav>
        ${this._renderNavMapUl(this.siteMap.subRoutes, this.authorizations, false)}
      </nav>
      <main>
        <div class="page">
          ${this.siteMap.getRoute(this.page, this.authorizations).page}
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
    installRouter(store, 'home', window.MyAppGlobals.rootPath);
  }

  protected _stateChanged(state: AppState, lastState: AppState): void {
    this.page = state.router.page;
    this.authorizations = state.authorizations.authorizations;
    if (state.todos.list.length != 0 && !this.authorizations.includes('VIEW_TODO')) {
      store.dispatch(addAuthorizations(['VIEW_TODO']));
    } else if (state.todos.list.length == 0 && this.authorizations.includes('VIEW_TODO')) {
      store.dispatch(removeAuthorizations(['VIEW_TODO']));
    }
  }

}

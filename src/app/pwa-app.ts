// Inspiration: https://www.geeksforgeeks.org/create-a-single-page-application-using-html-css-javascript/
import { CSSResultGroup, LitElement, css, html, unsafeCSS } from 'lit-element'
import { customElement, property } from 'lit/decorators.js'

// redux
import { store, AppState } from '@/core/store';

// styles
import pwastyles from '@styles/pwastyles.css?inline';
import { PwaPage404 } from './core/components/pages/pwa-page-404';
import { PwaPage } from './core/components/pages/PwaPage';
import { PwaPagePage1 } from './core/components/pages/pwa-page-page1';
import { PwaPagePage2 } from './core/components/pages/pwa-page-page2';
import { PwaPageHome } from './core/components/pages/pwa-page-home';
import { ConnectMixin } from '@store/connectMixin';
import { installRouter } from './router';

// import '@pwaMenu/pwa-menu-bar';

// TODO: nav stuff to separate file?
type NavMap = { [key: string]: Nav };
class Nav {
  protected static HREF_DELIMITER = '/';

  private _href: string;
  constructor(
    public readonly title: string,
    public readonly page: PwaPage,
    public readonly navMap?: NavMap,
    public readonly showInMenu = true
  ) { }
  protected set href(href: string) {
    this._href = href;
    this.page.href = href;
    if (this.navMap) {
      Object.keys(this.navMap).forEach(key => {
        const nav = this.navMap[key];
        nav.href = (href ? href + Nav.HREF_DELIMITER : '') + key;
      })
    }
  }
  get href(): string {
    return this._href;
  }
  getPage(key: string): PwaPage {
    if (!key) {
      return this.page;
    } else {
      const i = key.indexOf(Nav.HREF_DELIMITER);
      const subKey = i >= 0 ? key.substring(0, key.indexOf(Nav.HREF_DELIMITER)) : key;
      const restKey = i >= 0 ? key.substring(key.indexOf(Nav.HREF_DELIMITER) + 1) : undefined;
      const subNav = this.navMap[subKey];
      return subNav ? subNav.getPage(restKey) : undefined;
    }
  }
}
class RootNav extends Nav {
  constructor(
    contextPath: string,
    title: string,
    navMap: NavMap,
    public readonly fourOFour: Nav,
    public readonly home: string = 'home'
  ) {
    // super('/', '/', '/', subnav[home].page, subnav);
    super(title, navMap[home]?.page, navMap);
    this.href = contextPath;
    // this.href = '';
  }
  getPage(key: string): PwaPage {
    const page = super.getPage(key);
    return page || this.fourOFour.page;
  }
}

@customElement('pwa-app')
export class PwaApp extends ConnectMixin(store)(LitElement) {

  @property({ type: String })
  public page: string = 'home';
  private readonly rootNav: RootNav = new RootNav('/vite-pwa', 'test title', {
    'home': new Nav('Home', new PwaPageHome(this)),
    'test1': new Nav('Test 1', new PwaPagePage1(this)),
    'test2': new Nav('Test 2', new PwaPagePage2(this))
  }, new Nav('404 - Page Not Found', new PwaPage404(this)));

  private _renderNavMapUl(navMap: NavMap) {
    return html`
      <ul>
        ${Object.keys(navMap).filter(key => navMap[key].showInMenu).map(key => {
      const nav = navMap[key];
      return html`
            <li>
              <a href='${nav.href}'>${nav.title}</a>
              ${nav.navMap && this._renderNavMapUl(nav.navMap)}
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
        ${this._renderNavMapUl(this.rootNav.navMap)}
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

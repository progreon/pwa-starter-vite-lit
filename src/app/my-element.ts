import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { PWAElement } from './PWAElement'

import litLogo from '/assets/lit.svg'
import appLogo from '/favicon.svg'
// import '@components/pwa-badge/pwa-badge'
import '@components/todo-list/todo-viewer'
import '@components/todo-list/todo-adder'
import { installRouter, navigateToPage } from './router'
import { ConnectMixin } from '@store/connectMixin'
import { increment } from '@store/actions/counter'
import { AppState, store } from '@core/store'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends ConnectMixin(store)(LitElement) {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more, does the update-checker work now!? It does!'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  @property()
  page: string;

  render() {
    return html`
      <div id="content" class="flex flex-col">
        <div class="flex justify-center">
          <a href="https://vite.dev" target="_blank">
            <img src=${appLogo} class="logo" alt="vite-pwa-test logo" />
          </a>
          <a href="https://lit.dev">
            <img src=${litLogo} class="logo lit" alt="Lit logo" />
          </a>
        </div>
        <slot></slot>
        <div>Current page: ${this.page}</div>
        <div>
          <a href="/vite-pwa/">home</a>|
          <a href="/vite-pwa/test1">test1</a>|
          <a href="/vite-pwa/test2?p1=foo&p2=bar#asdf">test2</a>|
          <a href="/vite-pwa/test2/sub">sub2</a>|
          <a href="/noctx">noctx</a>|
          <a href="/otherctx/test">otherctx</a>|
          <a @click=${this._onAClick}>_onAClick</a>
        </div>
        <div class="card">
          <button @click=${this._onClick} part="button">
            count is ${this.count}
          </button>
        </div>
        <p class="read-the-docs">${this.docsHint}</p>
        <todo-adder></todo-adder>
        <!-- <todo-adder></todo-adder> -->
        <todo-viewer></todo-viewer>
        <!-- <todo-viewer></todo-viewer> -->
        <!-- <pwa-badge></pwa-badge> -->
      </div>
    `
  }

  connectedCallback(): void {
    super.connectedCallback();
    installRouter(store, 'home', '/vite-pwa');
  }

  private _onClick() {
    store.dispatch(increment());
  }

  private _onAClick() {
    navigateToPage('_onAClick');
  }

  _stateChanged(state: AppState) {
    this.count = state.counter.value;
    this.page = state.router.page;
  }

  static styles = [PWAElement.styles, css`
    /* * {
      border: 1px solid red;
    } */
    :host {
      /* padding: 2rem; */
      /* margin: 0 auto; */
      display: flex;
      justify-content: center;
      align-items: center;
      /* text-align: center; */
      /* place-items: center; */
      /* min-width: 320px; */
      /* max-width: 1280px; */
      /* min-height: 100vh; */
      width: 100%;
      height: 100%;
      /* min-width: 10px; */
      /* min-height: 10px; */
    }

    #content {
      /* margin: 0 auto; */
      /* margin: 0; */
      display: flex;
      flex-direction: column;
      /* justify-content: center; */
      /* align-items: stretch; */
    }

    #content > * {
      display: flex;
      /* flex: 0 1; */
      justify-content: center;
      /* margin: 0 auto; */
      /* padding: 0 1em; */
    }

    todo-viewer, todo-adder {
      padding: 0 1em;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    img {
      box-sizing: initial;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
      /* color: var(--app-color-purple); */
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      /* margin: 0px; */
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `];
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}

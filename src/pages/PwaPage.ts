import { LitElement } from 'lit-element'
import { property } from 'lit/decorators.js'

import { PwaApp } from '@/pwa-app';
import { AppState, store } from '@store/store';
import { ConnectMixin } from '@store/connectMixin';

// These are the shared styles needed by this element.
// import { AppStyles } from 'Shared/app-styles';

export abstract class PwaPage extends ConnectMixin(store)(LitElement) {

  // @property({ type: Object })
  // protected searchParams: URLSearchParams;
  @property({ type: Boolean, reflect: true })
  public active: boolean;
  protected app: PwaApp;
  public href: string;

  constructor(app: PwaApp) {
    super();
    this.app = app;
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  // static styles: CSSResultGroup = css`
  //   /* TODO: put some default styles here, if that even works? */
  // `;

  // Only render this page if it's actually visible.
  protected render(): unknown {
    // if (this.active) {
    return this._render();
    // } else {
    //   return undefined;
    // }
  }

  protected abstract _render(): unknown;

  protected _stateChanged(state: AppState): void {
    // Implement this!
    // console.debug('_stateChanged, to be implemented in page', this.href);
    // this.searchParams = new URLSearchParams(state.router.search);
  }

  // public showAppToast(text: any) {
  //   this.app.showToast(html`<div style="display: flex;">${text}</div>`);
  // }

  public triggerDataRefresh() {
    // Implement this!
  }

  // protected _isDevMode() {
  //   return this.app.isDevMode;
  // }
}

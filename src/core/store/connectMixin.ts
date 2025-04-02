import { LitElement, PropertyValues } from 'lit';
import { AppStore, AppState } from './store';

declare type Constructor<T> = new (...args: any[]) => T;
export const ConnectMixin = (store: AppStore) => <T extends Constructor<LitElement>>(superClass: T) => class extends superClass {
  protected __storeUnsubscribe: () => void;
  private __lastState: AppState = undefined;
  connectedCallback() {
    // Connect the element to the store.
    this.__storeUnsubscribe = store.subscribe(() => {
      // console.debug('state:', store.getState())
      this.__stateChanged(store.getState())
    });
    this.__stateChanged(store.getState());
    if (super.connectedCallback) {
      super.connectedCallback();
    }
  }
  disconnectedCallback() {
    this.__storeUnsubscribe();
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
  }
  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.__stateChanged(store.getState());
  }
  // This is called every time something is updated in the store.
  private __stateChanged(state: AppState): void {
    if (this.__lastState !== state) {
      this._stateChanged(state, this.__lastState);
      this.__lastState = state;
    }
  }
  protected _stateChanged(state: AppState, lastState: AppState): void {
    throw new Error('_stateChanged(state: AppState, lastState: AppState) not implemented');
  }
};
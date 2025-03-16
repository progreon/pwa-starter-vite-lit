import { LitElement } from 'lit';
import { PwaStore, PwaState } from './store';

declare type Constructor<T> = new (...args: any[]) => T;
export const ConnectMixin = (store: PwaStore, debug = false) => <T extends Constructor<LitElement>>(superClass: T) => class extends superClass {
  protected __storeUnsubscribe: () => void;
  connectedCallback() {
    // Connect the element to the store.
    this.__storeUnsubscribe = store.subscribe(() => this._loggedStateChanged(store.getState()));
    this._loggedStateChanged(store.getState());
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
  private _loggedStateChanged(_state: PwaState) {
    if (debug) {
      console.debug("state changed", _state);
    }
    this._stateChanged(_state);
  }
  // This is called every time something is updated in the store.
  protected _stateChanged(_state: PwaState) {
    throw new Error('_stateChanged() not implemented');
  }
};
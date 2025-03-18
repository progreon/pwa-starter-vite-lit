import { LitElement } from 'lit';
import { PwaStore, PwaState } from './store';

declare type Constructor<T> = new (...args: any[]) => T;
export const ConnectMixin = (store: PwaStore) => <T extends Constructor<LitElement>>(superClass: T) => class extends superClass {
  protected __storeUnsubscribe: () => void;
  connectedCallback() {
    // Connect the element to the store.
    this.__storeUnsubscribe = store.subscribe(() => this._stateChanged(store.getState()));
    this._stateChanged(store.getState());
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
  // This is called every time something is updated in the store.
  protected _stateChanged(state: PwaState): void {
    throw new Error('_stateChanged() not implemented');
  }
};
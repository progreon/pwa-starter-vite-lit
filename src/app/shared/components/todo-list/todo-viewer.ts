import { LitElement, css, html, unsafeCSS } from 'lit-element'
import { customElement, property } from 'lit/decorators.js'

// redux
import { store, ConnectMixin, todoToggled, PwaState, todoCleared } from '@redux';

// styles
import pwastyles from '@styles/pwastyles.css?inline';

@customElement('todo-viewer')
export class TodoViewer extends ConnectMixin(store)(LitElement) {

  @property({ type: Array })
  todoList = [];

  render() {
    return html`
      <p>TODO's:</p>
      <div class="card">
        <button @click=${this._onClickClear} part="button">
          clear
        </button>
      </div>
      <ul>
        ${this.todoList.map(li => html`
          <li ?completed=${li.completed} @click=${this._onClickToggle.bind(this, li.id)}>${li.id}: ${li.text}</li>
        `)}
      </ul>
    `;
  }

  _onClickToggle(id) {
    store.dispatch(todoToggled(id));
  }

  _onClickClear() {
    store.dispatch(todoCleared());
  }

  protected _stateChanged(state: PwaState): void {
    this.todoList = state.todos.list;
    // this.todoList = state.state.todos.list;
  }

  static styles = [unsafeCSS(pwastyles), css`
    :host {
      display: flex;
      flex-direction: column;
    }
    li[completed] {
      text-decoration: line-through;
      color: gray;
    }

    .card {
      padding: 0 2em;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #f9f9f9;
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

    /* @media (prefers-color-scheme: dark) {
      button {
        background-color: #1a1a1a;
      }
    } */
  `];

}
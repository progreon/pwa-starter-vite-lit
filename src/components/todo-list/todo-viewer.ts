import { LitElement, css, html, unsafeCSS } from 'lit-element'
import { customElement, property } from 'lit/decorators.js'

// redux
import { store, AppState } from '@store/store';
import { ConnectMixin } from '@store/connectMixin';
import { todoAdded, todoToggled, todoCleared } from '@actions/todos';

// styles
import pwastyles from '@/pwastyles.css?inline';

// data
import sampleTodos from '@data/sample-todos.json';

@customElement('todo-viewer')
export class TodoViewer extends ConnectMixin(store)(LitElement) {

  @property({ type: Array })
  todoList = [];

  render() {
    return html`
      <p>TODO's:</p>
      <div class="card">
        <button @click=${this._onClickClear} part="button">
          Clear
        </button>
      <!-- </div> -->
      <!-- <div class="card"> -->
        <button @click=${this._onClickSample} part="button">
          Fill sample todo's
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

  _onClickSample() {
    console.log('_onClickDummy', sampleTodos)
    sampleTodos.list.forEach(todo => {
      store.dispatch(todoAdded({ text: todo.text, completed: todo.completed }))
    })
  }

  protected _stateChanged(state: AppState): void {
    this.todoList = state.todos.list;
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
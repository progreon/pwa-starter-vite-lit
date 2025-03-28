// @ts-check
import { LitElement, css, html, unsafeCSS } from 'lit-element'
import { customElement, property } from 'lit/decorators.js'

// redux
import { store, AppState } from '@/core/store';
import { ConnectMixin } from '@store/connectMixin';
import { todoAdded, todoToggled, todoCleared } from '@/core/store/actions/todos';

// styles
import pwastyles from '@styles/pwastyles.css?inline';

// data
import sampleTodosJson from '@data/sample-todos.json';
import sampleTodosTxt from '@data/sample-todos.txt?raw';
import sampleTodosCsv from '@data/sample-todos.csv?raw';

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
        <button @click=${this._onClickSampleJson} part="button">
          Fill samples from .json
        </button>
      <!-- </div> -->
      <!-- <div class="card"> -->
        <button @click=${this._onClickSampleTxt} part="button">
          Fill samples from .txt
        </button>
      <!-- </div> -->
      <!-- <div class="card"> -->
        <button @click=${this._onClickSampleCsv} part="button">
          Fill samples from .csv
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

  _onClickSampleJson() {
    type JTodo = typeof sampleTodosJson;
    const typedJson: JTodo = sampleTodosJson;
    console.log('_onClickDummy', sampleTodosJson)
    typedJson.list.forEach(todo => {
      store.dispatch(todoAdded({ text: todo.text, completed: todo.completed }))
    })
  }

  _onClickSampleTxt() {
    console.log('_onClickDummy', sampleTodosTxt)
    const rows = sampleTodosTxt.split(/\r?\n/).map(r => ({ text: r.substring(1), completed: r[0] == '+' }));
    rows.forEach(todo => {
      store.dispatch(todoAdded({ text: todo.text, completed: todo.completed }))
    })
  }

  _onClickSampleCsv() {
    const parsed = this._parseCsv(sampleTodosCsv);
    console.log('_onClickDummy', parsed);
    parsed.forEach(todo => {
      store.dispatch(todoAdded({ text: todo.text, completed: todo.completed }))
    })
  }

  _parseCsv(data: string, withHeader = true, ...delimiters: string[]): any {
    delimiters.length || delimiters.push(';');
    const rows = data.split(/\r?\n/).map(r => r.split(new RegExp(delimiters.map(d => `\\${d}`).join("|"))));
    const n = rows[0].length;
    if (rows.filter(r => r.length != n).length) return (console.error("Inconsistent column count!"), []);
    const header = withHeader ? rows.shift() : Array.from({ length: n }, (_, i) => i + '');
    return rows.map(values => header.reduce((resRow, h, i) => { resRow[h] = values[i] == '0' ? 0 : +values[i] || (['true', 'false'].includes(values[i]) ? values[i] == 'true' : values[i]); return resRow }, {}));
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
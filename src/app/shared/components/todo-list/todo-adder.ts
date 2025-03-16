import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

// redux
import { store, todoAdded } from '@redux';

// styles
import pwastyles from '@styles/pwastyles.css?inline';

@customElement('todo-adder')
export class TodoAdder extends LitElement {

  @property({ type: Array })
  todoList = [];

  render() {
    return html`
      <input id="input" type="text">
      <div class="card">
        <button @click=${this._onClickAdd} part="button">
          add todo
        </button>
      </div>
    `;
  }
  
  private _onClickAdd() {
    // const todo = this.dummyTodos.shift();
    let input: HTMLInputElement = <HTMLInputElement> this.shadowRoot.getElementById("input");
    store.dispatch(todoAdded(input.value));
  }

  // static styles = [ css`
  static styles = [unsafeCSS(pwastyles), css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    input {
      flex: 1;
    }

    .card {
      padding: 2em;
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
  `];

}
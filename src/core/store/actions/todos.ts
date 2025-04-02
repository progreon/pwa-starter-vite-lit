import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
  id: number
  text: string
  completed: boolean
}
export interface TodoState {
  list: Todo[]
}

const initialState: TodoState = { list: [] }

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: (state: TodoState, action: PayloadAction<{ text: string, completed?: boolean }>) => {
      let todo: Todo = {
        id: state.list.length + 1,
        text: action.payload.text,
        completed: action.payload.completed,
      }
      state.list.push(todo)
      return state;
    },
    todoToggled: (state: TodoState, action: PayloadAction<number>) => {
      const todo = state.list.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    todoCleared: (state: TodoState) => {
      state.list.splice(0)
    }
  }
})

export const { todoAdded, todoToggled, todoCleared } = todosSlice.actions

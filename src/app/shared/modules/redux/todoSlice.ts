import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TodoState {
  id: number
  text: string
  completed: boolean
}

// const persistedStateString = localStorage.getItem('redux/todos');
// const initialState: TodoState[] = persistedStateString ? JSON.parse(persistedStateString) : []
// const persistState = state => localStorage.setItem('redux/todos', JSON.stringify(state));

const initialState: TodoState[] = []

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: (state: TodoState[], action: PayloadAction<string>) => {
      state.push({
        id: state.length+1,
        text: action.payload,
        completed: false
      })
    },
    todoToggled: (state: TodoState[], action: PayloadAction<number>) => {
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    todoCleared: (state: TodoState[]) => {
      state.splice(0)
    }
  }
})

export const { todoAdded, todoToggled, todoCleared } = todosSlice.actions
export default todosSlice.reducer

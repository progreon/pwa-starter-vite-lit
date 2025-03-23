import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TodoState {
  list: {
    id: number
    text: string
    completed: boolean
  }[]
}

const initialState: TodoState = { list: [] }

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: (state: TodoState, action: PayloadAction<string>) => {
      state.list.push({
        id: state.list.length+1,
        text: action.payload,
        completed: false
      })
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
export const todosReducer = todosSlice.reducer

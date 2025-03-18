import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RouterState {
  page: string
  /**
   * You can get a proper searchParams object by running new URLSearchParams(search)
   */
  search?: string
  hash?: string
  scroll?: number
}

const initialState: RouterState = { page: '' }

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    navigatedToPage: (state: RouterState, action: PayloadAction<RouterState>) => {
      const ns = action.payload // new state
      state.page = ns.page
      state.search = ns.search
      state.hash = ns.hash
      state.scroll = ns.scroll
    }
  }
});

export const { navigatedToPage } = routerSlice.actions;
export default routerSlice.reducer;

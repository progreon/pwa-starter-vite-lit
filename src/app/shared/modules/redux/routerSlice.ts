import { createSlice } from '@reduxjs/toolkit';

export class PRWRouterState {
  page: string = '';
  attributes: { [key: string]: string | string[] } = {};
}

const routerSlice = createSlice({
  name: 'router',
  initialState: [],
  reducers: {
    navigate(state, action: { payload: PRWRouterState, type: string}) {
      state.push(action.payload)
    }
  }
});

export const { navigate } = routerSlice.actions;
export default routerSlice.reducer;

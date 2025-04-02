import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthorizationsState {
  authorizations: string[]
}

const initialState: AuthorizationsState = { authorizations: [] }

export const authorizationsSlice = createSlice({
  name: 'authorizations',
  initialState,
  reducers: {
    setAuthorizations: (state: AuthorizationsState, action: PayloadAction<string[]>) => {
      state.authorizations = action.payload;
    },
    addAuthorizations: (state: AuthorizationsState, action: PayloadAction<string[]>) => {
      state.authorizations = [...state.authorizations, ...action.payload];
      state.authorizations = [...new Set(state.authorizations)]; // remove duplicates
    },
    removeAuthorizations: (state: AuthorizationsState, action: PayloadAction<string[]>) => {
      state.authorizations = state.authorizations.filter(auth => !action.payload.includes(auth));
    },
    clearAuthorizations: (state: AuthorizationsState) => {
      state.authorizations = [];
    }
  }
});

export const { setAuthorizations, addAuthorizations, removeAuthorizations, clearAuthorizations } = authorizationsSlice.actions;

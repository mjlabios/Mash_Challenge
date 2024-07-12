import {createReducer} from '@reduxjs/toolkit';
import {setUser} from './actions/actions';
import {UserState, UserAction} from './actions/types';

const initialState: UserState = {
  currentUser: null,
};

const userReducer = createReducer(initialState, builder => {
  builder.addCase(setUser, (state, action) => {
    state.currentUser = action.payload;
  });
});

export default userReducer;

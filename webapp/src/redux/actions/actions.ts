import {ActionType, User} from './types';
import {createAction} from '@reduxjs/toolkit';

export const setUser = createAction<User>(ActionType.SET_USER);

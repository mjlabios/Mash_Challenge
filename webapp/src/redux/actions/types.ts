export interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

export interface SetUserAction {
  type: ActionType.SET_USER;
  payload: User;
}

export type UserAction = SetUserAction;

export interface UserState {
  currentUser: User | null;
}

export enum ActionType {
  SET_USER = "SET_USER",
}

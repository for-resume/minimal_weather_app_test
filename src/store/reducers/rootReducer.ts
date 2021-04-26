import { combineReducers } from 'redux';

import cityReducer from './cityReducer';

export const rootReducer = combineReducers({
  city: cityReducer,
});

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

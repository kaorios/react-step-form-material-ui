import {combineReducers} from 'redux';
import {PersonReducer} from './person';

export const rootReducer = combineReducers({
  person: PersonReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

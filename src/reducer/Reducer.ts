import { combineReducers } from 'redux';
import { TaskReducer } from './TaskReducer';

export const Reducer = combineReducers({
    task: TaskReducer
});

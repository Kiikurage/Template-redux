import { AnyAction, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Reducer } from '../reducer/Reducer';
import { DefaultTaskState, TaskState } from './TaskState';

const logger = createLogger({});

export interface AppState {
    task: TaskState;
}

export namespace AppState {
    export type Dispatch = ThunkDispatch<AppState, undefined, AnyAction>;
}

export const Store = createStore(
    Reducer,
    {
        task: DefaultTaskState
    },
    applyMiddleware(thunk, logger)
);

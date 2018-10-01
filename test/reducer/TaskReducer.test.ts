import * as Immutable from 'immutable';
import { AnyAction } from 'redux';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { CounterAction } from '../../src/action/CounterAction';
import { Task } from '../../src/model/Counter';
import { AppState } from '../../src/state/Store';
import uuid = require('uuid');

const mockStore = configureStore<AppState, ThunkDispatch<AppState, undefined, AnyAction>>([thunk]);

function createMockStore() {
    const task1 = Task({ id: uuid.v4(), name: 'task1', checked: true });
    const task2 = Task({ id: uuid.v4(), name: 'task2', checked: false });
    const tasks = Immutable.Map<Task>({
        [task1.get('id')]: task1,
        [task2.get('id')]: task2
    });

    return mockStore({
        task: {
            tasks: tasks
        }
    });
}

describe('TaskReducer', () => {
    test('addItemAsync', () => {
    });

    test('TASK_REMOVE_ITEM', () => {
        const store = createMockStore();
        const expectedState = store.getState();

        const removedItem = expectedState.task.tasks.valueSeq().get(0)!;
        expectedState.task.tasks = expectedState.task.tasks.remove(removedItem.get('id'));

        store.dispatch({
            type: TaskAction.Type.TASK_REMOVE_ITEM,
            id: removedItem.get('id')
        });

        expect(store.getState()).toEqual(expectedState);
    });

    test('updateCheckedStatus', () => {
        const store = createMockStore();
        const expectedState = store.getState();

        const modifiedItem = expectedState.task.tasks.valueSeq().get(0)!;
        expectedState.task.tasks = expectedState.task.tasks.set(modifiedItem.get('id'), modifiedItem.set('checked', !modifiedItem.get('checked')));

        store.dispatch({
            type: TaskAction.Type.TASK_UPDATE_CHECKED_STATUS,
            id: modifiedItem.get('id'),
            newValue: modifiedItem.get('checked')
        });

        expect(store.getState()).toEqual(expectedState);
    });
});

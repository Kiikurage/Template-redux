import { AnyAction } from 'redux';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { CounterAction } from '../../src/action/CounterAction';
import { Task } from '../../src/model/Counter';
import { AppState } from '../../src/state/Store';

const mockStore = configureStore<AppState, ThunkDispatch<AppState, undefined, AnyAction>>([thunk]);

describe('CounterAction', () => {
    test('addItemAsync', () => {
        const store = mockStore();
        store
            .dispatch(TaskAction.addItemAsync('test'))
            .then(() => {
                expect(store.getActions).toEqual([{
                    type: TaskAction.Type.TASK_ADD_ITEM,
                    pending: true,
                    fulfilled: false,
                    rejected: false
                }, {
                    type: TaskAction.Type.TASK_ADD_ITEM,
                    pending: false,
                    fulfilled: true,
                    rejected: false,
                    value: Task({
                        name: 'test',
                        id: expect.anything(),
                        checked: false
                    })
                }]);
            });

        expect(1).toBe(1);
    });

    test('removeItem', () => {
        expect(TaskAction.removeItem('test_id')).toEqual({
            type: TaskAction.Type.TASK_REMOVE_ITEM,
            id: 'test_id'
        });
    });

    test('updateCheckedStatus', () => {
        expect(TaskAction.updateCheckedStatus('test_id', true)).toEqual({
            type: TaskAction.Type.TASK_UPDATE_CHECKED_STATUS,
            id: 'test_id',
            newValue: true
        });
    });
});

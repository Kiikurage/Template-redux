import { CounterAction } from '../action/CounterAction';
import { DefaultTaskState, TaskState } from '../state/TaskState';

export function TaskReducer(state: TaskState | undefined, action: CounterAction) {
    if (!state) return DefaultTaskState;

    switch (action.type) {
        case TaskAction.Type.TASK_ADD_ITEM:
            if (action.fulfilled) {
                return {
                    ...state,
                    tasks: state.tasks.set(action.result.id, action.result)
                };

            } else {
                return state;
            }

        case TaskAction.Type.TASK_REMOVE_ITEM:
            return {
                ...state,
                tasks: state.tasks.remove(action.id)
            };

        case TaskAction.Type.TASK_UPDATE_CHECKED_STATUS: {
            return {
                ...state,
                tasks: state.tasks.update(action.id, (oldItem) => oldItem.set('checked', action.newValue))
            };
        }

        default:
            return state;
    }
}

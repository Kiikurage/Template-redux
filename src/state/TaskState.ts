import * as Immutable from 'immutable';
import { Task } from '../model/Counter';

export interface TaskState {
    tasks: Immutable.Map<string, Task>;
}

export const DefaultTaskState: TaskState = {
    tasks: Immutable.Map()
};

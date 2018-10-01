import * as Immutable from 'immutable';

interface Props {
    id: string;
    name: string;
    checked: boolean;
}

export type Task = Immutable.Record<Props>;

export const Task = Immutable.Record<Props>({
    id: '(unknown)',
    name: '(unknown)',
    checked: false
}, 'Task');


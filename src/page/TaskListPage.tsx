import * as Immutable from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { CounterAction } from '../action/CounterAction';
import { Counter } from '../component/Counter';
import { Task } from '../model/Counter';
import { AppState } from '../state/Store';

interface Props {
    tasks: Immutable.Map<string, Task>;
    createNewTask: (name: string) => void;
    removeTask: (id: string) => void;
    updateCheckedStatus: (task: Task, newValue: boolean) => void;
}

function _TaskListPage(props: Props) {
    return (
        <div>
            <form onSubmit={ (ev) => {
                ev.preventDefault();

                const input = document.getElementById('newTaskName') as HTMLInputElement | undefined;
                if (!input) return;

                props.createNewTask(input.value);
                input.value = '';
            } }>
                <input type="text" id="newTaskName"/>
                <input type="submit" value="Create"/>
            </form>

            <ul>
                {
                    props.tasks.valueSeq()
                        .map(task => (
                            <Counter key={ task.get('id') }
                                     task={ task }
                                     createNewTask={ props.createNewTask }
                                     removeTask={ props.removeTask }
                                     updateCheckedStatus={ props.updateCheckedStatus }/>
                        ))
                        .toArray()
                }
            </ul>
        </div>
    );
}

function mapStateToProps(state: AppState) {
    return {
        tasks: state.task.tasks
    };
}

function mapDispatchToProps(dispatch: AppState.Dispatch) {
    return {
        createNewTask: (name: string) => {
            dispatch(TaskAction.addItemAsync(name));
        },
        removeTask: (id: string) => {
            dispatch(TaskAction.removeItem(id));
        },
        updateCheckedStatus: (task: Task, newValue: boolean) => {
            dispatch(TaskAction.updateCheckedStatus(task.get('id'), newValue));
        }
    };
}

export const TaskListPage = connect(mapStateToProps, mapDispatchToProps)(_TaskListPage);

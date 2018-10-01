import { Dispatch } from 'redux';

type TypedAction<T extends string | number> = { type: T };

export const action = <T extends string | number, P extends TypedAction<T>>(props: P) => props;

interface PendingAction<T extends string | number> {
    type: T;
    pending: true;
    fulfilled: false;
    rejected: false;
}

interface FulfilledAction<T extends string | number, V> {
    type: T;
    pending: false;
    fulfilled: true;
    rejected: false;
    result: V;
}

interface RejectedAction<T extends string | number> {
    type: T;
    pending: false;
    fulfilled: false;
    rejected: true;
    error: Error;
}

//tslint:disable-next-line:no-any
type AsyncAction<T extends string | number, V> = PendingAction<T> | FulfilledAction<T, V> | RejectedAction<T>;

type AsyncActionCreator<T extends string | number, V> = (dispatch: Dispatch) => Promise<AsyncAction<T, V>>;

export function asyncAction<T extends string | number, V>(type: T, fn: () => Promise<V>): AsyncActionCreator<T, V> {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: type,
            pending: true,
            fulfilled: false,
            rejected: false
        }  as PendingAction<T>);

        try {
            const result = await fn();
            const action = {
                type: type,
                pending: false,
                fulfilled: true,
                rejected: false,
                result: result
            } as FulfilledAction<T, V>;
            dispatch(action);
            return action;

        } catch (error) {
            const action = {
                type: type,
                pending: false,
                fulfilled: false,
                rejected: true,
                error: error
            } as RejectedAction<T>;
            dispatch(action);
            return action;
        }
    };
}

export type ActionTypeUnion<AC> = {
    //tslint:disable-next-line:no-any
    [K in keyof AC]: AC[K] extends (...args: any[]) => TypedAction<infer T> ? ReturnType<AC[K]> :
        //tslint:disable-next-line:no-any
        AC[K] extends (...args: any[]) => AsyncActionCreator<infer T, infer V> ? AsyncAction<T, V> :
            never;
}[keyof AC];


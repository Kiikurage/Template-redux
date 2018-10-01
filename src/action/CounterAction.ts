import { action, ActionTypeUnion, asyncAction } from './actionUtil';

export namespace CounterAction {
    export enum Type {
        INCREMENT = 0x1000,
        DECREMENT,
        RESET
    }

    export function increment() {
        return asyncAction(Type.INCREMENT, async () => {
            await new Promise(r => setTimeout(r, 1000));

            return null;
        });
    }

    export function decrement() {
        return action({ type: Type.DECREMENT });
    }

    export function reset() {
        return action({ type: Type.RESET });
    }
}

export type CounterAction = ActionTypeUnion<typeof CounterAction>;

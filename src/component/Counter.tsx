import * as React from 'react';

interface Props {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

export function Counter(props: Props) {
    return (
        <div>
            <button onClick={ props.decrement }>-</button>
            <span>{ props.count }</span>
            <button onClick={ props.increment }>+</button>
            <button onClick={ props.reset }>clear</button>
        </div>
    );
}

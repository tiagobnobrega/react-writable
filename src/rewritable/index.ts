import {useEffect, useState} from "react";
//types
interface IReadableStore{
    subscribe(run: (v: any) => void): Function;
    useSubscribe(): any[],
}
interface IWritableStore extends IReadableStore{
    update(fn: (v: any) => void): void
}

const noop: Function = (_: Function) => {
};

function safe_not_equal(a: any, b: any) {
    // eslint-disable-next-line eqeqeq,no-self-compare
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

//code
export function writable(value: any, start:Function = noop): IWritableStore {
    let stop: Function;
    const subscribers: Function[] = [];

    function set(new_value: any) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (!stop) {
                return; // not ready
            }
            subscribers.forEach((s) => s(value));
        }
    }

    function subscribe(run: Function) {
        const subscriber = run;
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
            }
        };
    }

    function useSubscribe() {
        const [state,setState] = useState(value);
        useEffect(() => subscribe(setState),[]);
        return [state, set];
    }

    function update(fn: Function) {
        set(fn(value));
    }

    return {subscribe, useSubscribe, update};
}

export function get(rewritable: IWritableStore):any {
    let value;
    rewritable.subscribe((_) => value = _)();
    return value;
}

export function readable(value: any, start = noop):IReadableStore {
    const {subscribe, useSubscribe} = writable(value, start);
    return {subscribe, useSubscribe};
}

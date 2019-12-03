import {writable} from "../rewritable";
import writablePersist from "../rewritable/writable-persist";
import todoApi from '../api/todoApi';

export type Todo = {
    id?: number,
    description: string,
    isDone: boolean
}

// const persist = writablePersist(localStorage,"APP_TODOS");

const initialState = {data: [], isFetching: true};

export const store = writable(initialState, async (set: Function) => {
    set({...initialState, isFetching: true});
    const data = await todoApi.get();
    set({data, isFetching: false});
    return () => {
    };
});

// store.subscribe(persist.listener);

const useTodos = () => {
    const [state, setState] = store.useSubscribe();
    const {data} = state;
    return [state, {
        addTodo: async (description: string) => {
            setState({...state, isFetching: true});
            const newTodo = {id: new Date().getTime(), description, isDone: false};
            await todoApi.add(newTodo);
            // const data = await todoApi.get();
            setState({data: [...state.data, newTodo], isFetching: false});
        },
        toggleDone: async (todo: Todo) => {
            setState({...state, isFetching: true});
            const updated = await todoApi.toggleDone(todo.id);
            setState({...state, isFetching: false, data: data.map((t: Todo) => t.id === updated.id ? updated : t)});
        },
        updateTodo: (todo: Todo) => {
            const todoIndex = data.findIndex((e: Todo) => e.id === todo.id);
            if (todoIndex === -1) throw new Error("Todo not found:" + todo.id);
            setState([...state, {[todoIndex]: todo}]);
        },
        removeTodo: async (todo: Todo) => {
            setState({...state, isFetching: true});
            await todoApi.remove(todo.id);
            setState({...state, data: data.filter((e: Todo) => e.id !== todo.id), isFetching: false});
        },
        clear: () => setState(initialState),
    }];
};

export default useTodos;
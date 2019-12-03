import {writable} from "../rewritable";
import writablePersist from "../rewritable/writable-persist";

export type Todo = {
    id?: string,
    description: string,
    isDone: boolean
}

const persist = writablePersist(localStorage,"APP_TODOS");

const initialState = {data: [{id:1,description:"Teste",isDone:false}], isFetching:false};
export const store = writable(initialState, persist.starter);

store.subscribe(persist.listener);

const useTodos = ()=>{
    const [todos,setTodos] = store.useSubscribe();
    return [todos,{
        addTodo: (description:string)=> {
            setTodos([...todos,{id: new Date().getTime(), description, isDone:false}]);
        },
        toggleDone:(todo:Todo)=>{
            todo.isDone = !todo.isDone;
            setTodos(todos.map((t:Todo)=>t.id===todo.id ? todo: t));
        },
        updateTodo: (todo:Todo)=>{
            const todoIndex = todos.findIndex((e:Todo)=>e.id===todo.id);
            if(todoIndex===-1) throw new Error("Todo not found:"+todo.id);
            setTodos([...todos, {[todoIndex]:todo}]);
        },
        removeTodo: (todo:Todo)=>{
            setTodos(todos.filter((e:Todo)=>e.id!==todo.id));
        },
        clear: ()=>setTodos([]),
    }];
};

export default useTodos;
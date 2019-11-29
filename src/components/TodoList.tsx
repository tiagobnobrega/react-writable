import React from "react";
import useTodos, {Todo} from "../state/useTodos";

type TodoListItemProps = {
    todo:Todo;
    actions: any;
}
const TodoListItem: React.FC<TodoListItemProps> = (props)=>{
    const {todo, actions} = props;
    const label = todo.isDone ? "Not Done :(" : "Done!";
    return <li>
        <span>[{todo.isDone? "X": " "}]{todo.description}</span>
        <span>
                <button onClick={()=>actions.toggleDone(todo)}>{label}</button>
                <button onClick={()=>actions.removeTodo(todo)}>Remove</button>
            </span>
    </li>
};

const TodoList : React.FC = ()=>{
    const [todos,actions] = useTodos();
    return (<ul>
        {todos.length===0 &&<li>Todo List is empty :-)</li>}
        {todos.length>0 && todos.map((t:Todo)=><TodoListItem todo={t} key={t.id} actions={actions} />)}
    </ul>)
};


export default TodoList;
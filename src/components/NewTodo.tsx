import React, {useState} from "react";
import useTodos from "../state/useTodos";

const NewTodo: React.FC = ()=>{
    const [desc,setDesc] = useState("");
    const [_,actions] = useTodos();
    return (<div>
        <input type="text" value={desc} onChange={(evt)=>setDesc(evt.target.value)} />
        <button onClick={()=>actions.addTodo(desc)}>Add</button>
    </div>)
};

export default NewTodo;
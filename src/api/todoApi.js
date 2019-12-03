import {Todo} from "../todo/useTodos";

let db = [{id:1,description:"Teste",isDone:false}];

const later = (delay, value) =>
    new Promise(resolve => setTimeout(resolve, delay, value));

export default {
  async get(){
    await later(200);
    return db;
  },
  async toggleDone(id){
    await later(200);
    const todo = db.find(e=>e.id===id);
    if(!todo) throw Error("Não encotrado todo com id"+id);
    todo.isDone = !todo.isDone;
    return todo;
  },
  async add(todo){
    await later(200);
    db.push(todo);
  },
  async remove(id){
    await later(200);
    db = db.filter((e)=>e.id!==id)
  }
}
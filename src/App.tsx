import React from 'react';
import logo from './logo.svg';
import './App.css';
import CounterA from "./components/CounterA";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <CounterA />
        <TodoList />
        <NewTodo />
      </header>
    </div>
  );
}

export default App;

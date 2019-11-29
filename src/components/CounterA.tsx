import React, {useEffect, useState} from "react";
import useCounterA, {store} from "../state/useCounterA";


const CounterA: React.FC =()=>{
    const [count, actions] = useCounterA();
    return(<div>
        <h2>Counter A:{count}</h2>
        <div><button onClick={()=>actions.increment(1)}>+</button></div>
        <div><button onClick={()=>actions.decrement(1)}>-</button></div>
        <div><button onClick={()=>actions.clear()}>Clear</button></div>
    </div>);

};

export default CounterA;
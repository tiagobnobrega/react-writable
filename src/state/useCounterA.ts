import {writable} from "../rewritable";

export const store = writable(0);
const useCounterA = ()=>{
    const [count,setCount] = store.useSubscribe();
    return [count,{
        increment: (amount:number)=> {
            setCount(count+amount);
        },
        decrement: (amount:number)=> {
            setCount(count-amount);
        },
        clear: ()=>setCount(0),
    }];
};

export default useCounterA;
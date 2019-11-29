import {writable} from "../rewritable";

const store = writable(0);
const useCounter = ()=>{
    const [count,setCount] = store.useSubscribe();
    return [count,{
        increment: (amount:number)=> setCount(count+amount),
        decrement: (amount:number)=> setCount(count+amount),
        clear: ()=>setCount(0),
    }];
};
export default useCounter;
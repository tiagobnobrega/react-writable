export default function (persistor: Storage, persistorKey: string) {
    return {
        starter: async (set: Function) => {
            const dataStr = persistor.getItem(persistorKey);
            if(dataStr){
                const data = JSON.parse(dataStr);
                set(data);
            }
            return ()=>{};
        },
        listener: (value:any)=>{
            const dataStr = JSON.stringify(value);
            persistor.setItem(persistorKey,dataStr);
        }
    }
}
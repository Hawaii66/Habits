import { createContext } from "react";
import { INotification } from "../Interfaces/Notification";

interface INotiContext {
    notification:INotification,
    sendNotification:(noti:INotification,delay:number)=>Promise<string|undefined>
}

export const NotiContext = createContext<INotiContext>(
    {
        notification:{
            body:"",
            data:"",
            title:"",
            code:"None"            
        },
        sendNotification:async (noti,delay) => {
            return await Promise.resolve("");
        }
    }
)
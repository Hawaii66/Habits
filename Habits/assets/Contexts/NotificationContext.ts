import { createContext } from "react";
import { INotification } from "../Interfaces/Notification";

interface INotiContext {
    notification:INotification,
    sendNotification:(noti:INotification,delay:number)=>void
}

export const NotiContext = createContext<INotiContext>(
    {
        notification:{
            body:"",
            data:"",
            title:"",
            code:"None"            
        },
        sendNotification:(_)=>{}
    }
)
import { createContext } from "react";
import { IUser } from "../Interfaces/User";

interface IUserContext {
    user:IUser,
    setUser:(user:IUser)=>void,
    expoToken:string,
    setToken:(token:string)=>void
}

export const UserContext = createContext<IUserContext>(
    {
        user:{
            appleID:"",
            email:"",
            name:"",
            username:"",
            expoPushToken:""
        },
        setUser:(user)=>{},
        expoToken:"",
        setToken:(t)=>{}
    }
)
import { createContext } from "react";
import { IUser } from "../Interfaces/User";

interface IUserContext {
    user:IUser,
    setUser:(user:IUser)=>void
}

export const UserContext = createContext<IUserContext>(
    {
        user:{
            appleID:"",
            email:"",
            name:"",
            username:""
        },
        setUser:(user)=>{}
    }
)
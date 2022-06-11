import { createContext } from "react";
import { IFamily } from "../Interfaces/Family";

interface IFamilyContext {
    family:IFamily,
    setFamily:(family:IFamily) => void
}

export const FamilyContext = createContext<IFamilyContext>(
    {
        family:{
            id:"",
            members:[],
            name:"",
            notes:[],
            shopping:[]
        },
        setFamily:(val)=>{}
    }
)
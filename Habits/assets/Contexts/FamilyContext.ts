import { createContext } from "react";
import { IFamily } from "../Interfaces/Family";

interface IFamilyContext {
    family:IFamily,
    setFamily:(family:IFamily) => void,
    refreshFamily:()=>Promise<void>
}

export const FamilyContext = createContext<IFamilyContext>(
    {
        family:{
            id:"",
            members:[],
            name:"",
            notes:[],
            shopping:[],
            voteID:""
        },
        setFamily:(val)=>{},
        refreshFamily:()=>new Promise(()=>{})
    }
)
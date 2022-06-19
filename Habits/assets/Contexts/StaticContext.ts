import { createContext, useContext } from "react";

interface IStaticContext {
    api:string,
    socketEndpoint:string
}

const api = "http://178.174.227.183:5555"
const socketEndpoint = "http://178.174.227.183:5555";

export const StaticContext = createContext<IStaticContext>(
    {
        api,
        socketEndpoint
    }
)

type GetDataType = (endpoint:string) => Promise<{
    success:boolean,
    data:any
}>
type UploadDataType = (endpoint:string, method:"POST"|"DELETE", payload:any) => Promise<{
    success:boolean,
    data:any
}>

export const getData:GetDataType = async (endpoint:string) => {
    const result = await fetch(api + endpoint, {
        method:"GET",
        headers:{
            "Content-type":"application/json"
        }
    });
    if(result.status < 200 || result.status > 299)
    {
        return {
            data:{},
            success:false
        }
    }
    return {
        data:await result.json(),
        success:true
    }
}

export const uploadData:UploadDataType = async (endpoint:string, method:string, payload:any) => {
    const result = await fetch(api + endpoint, {
        method:method,
        body:JSON.stringify(payload),
        headers:{
            "Content-type":"application/json"
        }
    });
    if(result.status < 200 || result.status > 299)
    {
        return {
            data:{},
            success:false
        }
    }

    const contentType = result.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1){
        const data = await result.json();
        return {
            data,
            success:true
        }
    }
    return({
        success:true,
        data:{}
    })
}
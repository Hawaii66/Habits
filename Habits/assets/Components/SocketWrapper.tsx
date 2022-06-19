import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { SocketContext } from '../Contexts/SocketContext';
import io, {Socket} from "socket.io-client";
import { StaticContext } from '../Contexts/StaticContext';
import { UserContext } from '../Contexts/UserContext';

interface Props
{
    children:ReactNode
}

function SocketWrapper({children}:Props)
{
    const [connected,setConnected] = useState(false);

    const {socketEndpoint} = useContext(StaticContext);
    const [socket,setSocket] = useState<Socket|null>(null);

    const {user} = useContext(UserContext);

    useEffect(()=>{
        const socket = io(socketEndpoint,{
            transports:["websocket"]
        });

        socket.io.on("open",()=>setConnected(true));
        socket.io.on("close",()=>setConnected(false));

        socket.emit("init",{
            email:user.email
        });

        setSocket(socket);

        return () => {
            socket.disconnect();
            socket.removeAllListeners();
        };
    },[]);

    return(
        <SocketContext.Provider value={{connected,socket}} >
            {children}
        </SocketContext.Provider>
    )
}

export default SocketWrapper
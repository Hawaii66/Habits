import { createContext } from "react";
import { IUser } from "../Interfaces/User";
import io, {Socket} from "socket.io-client";

export interface ISocketContext {
    connected:boolean,
    socket:Socket|null,
}

export const SocketContext = createContext<ISocketContext>(
    {
        connected:false,
        socket:null,
    }
)
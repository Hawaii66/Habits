const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
import cors from "cors";
import {Routes} from "./Routes/Routes";
import { SocketRoutes } from "./Routes/Socket/SocketRoutes";
require("dotenv").config();


const PORT = process.env.PORT || 5555;

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.use(cors());
app.use(express.json());

Routes(app);
SocketRoutes(io, app);

httpServer.listen(PORT, ()=>{
    console.log(`Server listening on: https://localhost:${PORT}`)
})
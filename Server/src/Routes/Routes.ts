import {Express} from "express";
import { NoteRoutes } from "./NoteRoutes";
import { TodoRoutes } from "./TodoRoutes";
import { UserRoutes } from "./UserRoutes";

require("dotenv").config();

export const Routes = async (app:Express) => {
    app.get("/",(_,res)=>{
        res.status(200).json({message:"Server online and working!"})
    });

    UserRoutes(app);
    TodoRoutes(app);
    NoteRoutes(app);
}
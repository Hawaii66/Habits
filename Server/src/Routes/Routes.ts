import {Express} from "express";
import { UpdateExpoToken } from "../Database/Users";
import { FamilyRoutes } from "./FamilyRoutes";
import { NoteRoutes } from "./NoteRoutes";
import { TodoRoutes } from "./TodoRoutes";
import { UserRoutes } from "./UserRoutes";

require("dotenv").config();

export const Routes = async (app:Express) => {
    app.get("/",(_,res)=>{
        res.status(200).json({message:"Server online and working!"})
    });

    app.post("/notification/save/:email",async(req,res)=>{
        const email = req.params.email;
        const token = req.body.token;
        console.log(email, token);
        
        await UpdateExpoToken(email, token);

        res.status(200).send();
    });

    UserRoutes(app);
    TodoRoutes(app);
    NoteRoutes(app);
    FamilyRoutes(app);
}
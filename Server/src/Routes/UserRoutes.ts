import {Express} from "express";
import { IUser } from "../Interfaces/User";
import { AddUser, GetUser } from "../Database/Users";

export const UserRoutes = (app:Express) => {
    app.post("/users/create",async (req,res)=>{
        const details:IUser = {
            email:req.body.email,
            name:req.body.name,
            username:req.body.username
        };

        await AddUser(details);
        res.status(201).send(`User created with email: ${details.email}`);
    });

    app.get("/users/get/:email", async (req,res)=>{
        const email = req.params.email;
        if(email === ""){
            res.status(400).send("No email parameter available");
            return;
        }

        const user = await GetUser(email);
        return res.status(200).json({user:user});
    });
}
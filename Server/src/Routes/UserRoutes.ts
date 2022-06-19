import {Express} from "express";
import { IUser } from "../Interfaces/User";
import { AddUser, GetUserEmail, GetUserID } from "../Database/Users";

export const UserRoutes = (app:Express) => {
    app.post("/users/create",async (req,res)=>{
        const details:IUser = {
            email:req.body.email,
            name:req.body.name,
            username:req.body.username,
            appleID:req.body.appleID,
            expoPushToken:req.body.pushToken
        };

        await AddUser(details);
        res.status(201).json({message:`User created with email: ${details.email}`});
    });

    app.get("/users/get/email/:email", async (req,res)=>{
        const email = req.params.email;
        if(email === ""){
            res.status(400).send("No email parameter available");
            return;
        }

        const user = await GetUserEmail(email);
        return res.status(200).json({user:user});
    });

    app.get("/users/get/appleid/:appleid", async (req,res)=>{
        const id = req.params.appleid;
        if(id === ""){
            res.status(400).send("No email parameter available");
            return;
        }

        const user = await GetUserID(id);
        return res.status(200).json({user:user});
    });
}
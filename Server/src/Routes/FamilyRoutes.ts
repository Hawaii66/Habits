import {Express} from "express";
import { GetUserEmail } from "../Database/Users";
import { AddMember, ChangeName, CreateFamily, GetFamilies, GetFamily, RemoveMember } from "../Database/Family";
import axios from 'axios';
import { VoteRoutes } from "./Family/Vote";
import { NoteRoutes } from "./Family/Notes";

export const FamilyRoutes = (app:Express) => {
    app.get("/family/get/member/:id",async (req,res) => {
        const member = req.params.id;
        const families = await GetFamilies(member);
        res.status(200).json(families);
    });

    app.post("/family/notification/send/:id", async(req,res)=>{
        const id = req.params.id;
        const header = req.body.header;
        const body = req.body.body;

        const family = await GetFamily(id);
        if(family === null){res.status(400).send("No family");return;}
        var data:{to:string[],body:string,title:string} = {
            to:[],
            body,
            title:header
        };

        for(var i = 0; i < family.members.length; i ++)
        {
            const user = await GetUserEmail(family.members[i]);
            data.to.push(user.expoPushToken);
        }
        await axios.post("https://exp.host/--/api/v2/push/send",data);
        res.status(200).send();
    });

    app.post("/family/create/:member", async (req,res)=> {
        const member = req.params.member;
        const family = await CreateFamily(member);
        res.status(200).json(family);
    });

    app.post("/family/add/member/:id", async (req,res) => {
        const id = req.params.id;
        await AddMember(id, req.body.member);
        res.status(200).send();
    });

    app.post("/family/remove/member/:id", async (req,res) => {
        const id = req.params.id;
        await RemoveMember(id, req.body.member);
        res.status(200).send();
    });
    
    app.post("/family/change/name/:id", async (req,res) => {
        const id = req.params.id;
        await ChangeName(id, req.body.name);
        res.status(200).send()
    });

    VoteRoutes(app);
    NoteRoutes(app);
}
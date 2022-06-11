import {Express} from "express";
import { AddMember, ChangeName, CreateFamily, GetFamilies, RemoveMember } from "../Database/Family";

export const FamilyRoutes = (app:Express) => {
    app.get("/family/get/member/:id",async (req,res) => {
        const member = req.params.id;

        const families = await GetFamilies(member);
        res.status(200).json(families);
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
    });
    
    app.post("/family/change/name/:id", async (req,res) => {
        const id = req.params.id;
        await ChangeName(id, req.body.name);
    });
}
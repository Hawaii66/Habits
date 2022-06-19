import {Express} from "express";
import { AddVote, CreateVote, DeleteVote, GetVote } from "../../Database/Vote";
import { IVote } from "../../Interfaces/Family";

export const VoteRoutes = (app:Express) => {
    app.post("/family/votes/create", async (req,res) => {
        const vote:IVote = {
            alternatives:req.body.alternatives,
            familyID:req.body.familyID,
            id:"",
            name:req.body.name,
            passes:0,
            passers:[]
        };
        const maybeOldVote = await GetVote(vote.familyID);
        if(maybeOldVote !== null)
        {
            res.status(200).json(maybeOldVote);
            return;
        }

        const newVote = await CreateVote(vote);
        res.status(200).json(newVote);
    });

    app.get("/family/votes/get/:familyID",async(req,res) => {
        const id = req.params.familyID;

        const vote = await GetVote(id);
        if(vote === null){res.status(400).send()}
        res.status(200).json(vote);
    });

    app.post("/family/votes/vote",async(req,res)=>{
        const familyID = req.body.familyID;
        const voteIndex = req.body.voteIndex;
        const email = req.body.email;

        const vote = await AddVote(familyID,voteIndex,email);
        if(vote === null){res.status(400).send("Error with adding a vote");}
    
        res.status(200).json(vote);
    });

    app.get("/family/votes/delete/:familyID",async(req,res)=>{
        const familyID = req.params.familyID;

        const family = await DeleteVote(familyID);
        res.status(200).json(family);
    });
}
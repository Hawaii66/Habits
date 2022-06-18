import {Express} from "express";
import { CreateVote, GetVote } from "../../Database/Vote";
import { IVote } from "../../Interfaces/Family";

export const VoteRoutes = (app:Express) => {
    app.post("/family/votes/create", async (req,res) => {
        const vote:IVote = {
            alternatives:req.body.alternatives,
            familyID:req.body.familyID,
            id:"",
            name:req.body.name,
            passes:0
        };
        console.log(vote);
        const maybeOldVote = await GetVote(vote.familyID);
        if(maybeOldVote !== null)
        {
            res.status(200).json(maybeOldVote);
            return;
        }
        console.log("Adding");

        const newVote = await CreateVote(vote);
        res.status(200).json(newVote);
    });

    app.get("/family/votes/get/:familyID",async(req,res) => {
        const id = req.params.familyID;

        const vote = await GetVote(id);
        res.status(200).json(vote);
    })
}
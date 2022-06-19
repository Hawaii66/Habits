import {Express} from "express";
import { GetFamilyNotes } from "../../Database/FamilyNotes";

export const NoteRoutes = (app:Express) => {
    app.get("/family/notes/get/:email",async(req,res)=>{
        const email = req.params.email;
        const notes = await GetFamilyNotes(email);
        res.status(200).json(notes);
    })
}
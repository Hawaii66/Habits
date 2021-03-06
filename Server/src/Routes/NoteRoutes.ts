import {Express} from "express";
import { CreateNote, DeleteNote, GetAllNotes, UpdateNote } from "../Database/Notes";
import { INote } from "../Interfaces/Notes";

export const NoteRoutes = (app:Express) => {
    app.get("/notes/private/get/:email", async (req,res)=>{
        const email = req.params.email;
        
        const notes = await GetAllNotes(email);
        res.status(200).json(notes);
    });

    app.post("/notes/private/create", async (req,res) => {
        const email = req.body.email;
        const toCreate:INote = {
            header:"Note",
            id:"",
            lastUpdated:Date.now(),
            owners:[email],
            private:true,
            text:"Start typing to add some notes"
        };

        const note = await CreateNote(toCreate);
        res.status(200).json(note);
    });
    
    app.post("/notes/private/update/:id", async (req,res) => {
        const id = req.params.id;
        const text = req.body.text;
        const header = req.body.header;

        await UpdateNote(id, text, header);
        res.status(200).send();
    });

    app.delete("/notes/private/delete/:id", async (req,res) => {
        const id = req.params.id;

        await DeleteNote(id);
        res.status(200).send();
    })
}
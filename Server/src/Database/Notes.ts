import { INote } from "../Interfaces/Notes";
import { notes } from "./Database";

type GetNotesType = (email:string) => Promise<INote[]>;
type CreateNoteType = (note:INote) => Promise<INote>;
type UpdateNoteType = (id:string, text:string) => Promise<void>;
type DeleteNoteType = (id:string) => Promise<void>;

export const CreateNote:CreateNoteType = async (note) => {
    const id = GetRandomID();
    note.id = id;
    return await notes.insert(note);
}

export const DeleteNote:DeleteNoteType = async (id) => {
    await notes.findOneAndDelete({id:id});
}

export const GetAllNotes:GetNotesType = async (email) => {
    const fetchedNotes:INote[] = await notes.find();
    var toGetNotes:INote[] = [];
    fetchedNotes.forEach(note => {
        if(note.owners.includes(email)){toGetNotes.push(note)}
    });
    return toGetNotes;
}

export const UpdateNote:UpdateNoteType = async (id,text) => {
    await notes.findOneAndUpdate({id:id},{$set:{text:text}});
}

function GetRandomID(){
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":note";
    return randomID;
}

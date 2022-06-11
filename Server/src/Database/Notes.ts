import { INote } from "../Interfaces/Notes";
import { notes } from "./Database";

type GetNotesType = (email:string) => Promise<INote[]>;
type CreateNoteType = (note:INote) => Promise<INote>;
type UpdateNoteType = (id:string, text:string, header:string) => Promise<void>;
type DeleteNoteType = (id:string) => Promise<void>;

export const CreateNote:CreateNoteType = async (note) => {
    const id = GetRandomID();
    note.id = id;
    const fakeNote = await notes.insert(note);
    const realNote:INote = {
        header:fakeNote.header,
        id:id,
        lastUpdated:fakeNote.lastUpdated,
        owners:fakeNote.owners,
        private:fakeNote.private,
        text:fakeNote.text
    };
    return realNote;
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

export const UpdateNote:UpdateNoteType = async (id,text,header) => {
    await notes.findOneAndUpdate({id:id},{$set:{text:text,header:header}});
}

function GetRandomID(){
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":note";
    return randomID;
}

import { INote } from "../Interfaces/Notes";
import { notes } from "./Database";
import { GetRandomID } from "./Family";

type CreateNoteType = (note:INote) => Promise<INote>;
type GetFamilyNotesType = (email:string) => Promise<INote[]>;
type GetFamilyNoteType = (id:string) => Promise<INote>;
type SaveFamilyNoteType = (note:INote) => Promise<void>;

export const CreateNote:CreateNoteType = async (note) => {
    note.id = GetRandomID("note");

    await notes.insert(note);
    return {
        header:"Title",
        id:note.id,
        lastUpdated:Date.now(),
        owners:note.owners,
        private:false,
        text:"Click me to edit the text",
    }
}

export const GetFamilyNotes:GetFamilyNotesType = async (email) => {
    const fetchedNotes:INote[] = await notes.find();
    var selected:INote[] = [];
    fetchedNotes.forEach((note)=>{if(note.owners.includes(email) && !note.private){selected.push(note)}});
    return selected;
}

export const GetFamilyNote:GetFamilyNoteType = async (id) => {
    const note:INote = await notes.findOne({id:id});
    console.log(note);
    return note;
}

export const SaveFamilyNote:SaveFamilyNoteType = async (note:INote) => {
    await notes.findOneAndUpdate({id:note.id},{$set:note});
}
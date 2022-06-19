import { INote } from "../Interfaces/Notes";
import { notes } from "./Database";
import { GetRandomID } from "./Family";

type CreateNoteType = (note:INote) => Promise<INote>;

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
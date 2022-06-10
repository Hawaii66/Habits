import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { INote } from '../../../Interfaces/Notes';
import NoteHome from './NoteHome';
import NoteView from './NoteView';

function NoteMain() {
    const [note,_setNote] = useState<INote>({
        header:"",
        id:"",
        lastUpdated:0,
        owners:[],
        private:true,
        text:""
    });

    const setNote = (note:INote) => {
        _setNote(note);
    }

    if(note.id === "")
    {
        return <NoteHome setNote={setNote}/>
    }

    return <NoteView note={note} setNote={setNote}/>
}

const styles = StyleSheet.create({
    main:{

    }
});

export default NoteMain
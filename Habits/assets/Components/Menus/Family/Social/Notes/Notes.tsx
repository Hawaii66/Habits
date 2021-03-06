import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FamilyContext } from '../../../../../Contexts/FamilyContext';
import { SocketContext } from '../../../../../Contexts/SocketContext'
import { getData } from '../../../../../Contexts/StaticContext';
import { UserContext } from '../../../../../Contexts/UserContext';
import { INote } from '../../../../../Interfaces/Notes';
import NoteEdit from './NoteEdit';
import NoteHome from './NoteHome';

interface Props
{

}

function Notes({}:Props)
{
    const {socket} = useContext(SocketContext);
    const {family} = useContext(FamilyContext);
    const {user} = useContext(UserContext);

    const [notes,setNotes] = useState<INote[]>([]);
    const [note,setNote] = useState<INote|null>(null);

    const create = () => {
        socket?.emit("S-FamilySocial-Notes-Create1",{familyID:family.id})
    }

    useEffect(()=>{
        if(socket === null){return;}
        
        socket.on("C-FamilySocial-Notes-Create",data=>{
            setNotes(old=>[...old, data]);
        });

        socket.on("C-FamilySocial-Notes-Delete",data=>{
            setNotes(data);
        });
    },[]);

    const getAllNotes = async () => {
        const result = await getData(`/family/notes/get/${user.email}`);
        setNotes(result.data);
    }

    const selectNote = async (id:string) => {
        const note = notes.filter(item=>{if(item.id===id){return item}})[0];

        socket?.emit("S-FamilySocial-Notes-Open",{
            noteID:id
        });
    }

    useEffect(()=>{
        getAllNotes();

        socket?.on("C-FamilySocial-Notes-Open",data=>{
            setNote(data);
        });
    },[])

    if(note === null)
    {
        return(<NoteHome setNotes={(n)=>setNotes(n)} notes={notes} selectNote={selectNote}/>)
    }

    if(note !== null)
    {
        return(<NoteEdit back={()=>setNote(null)} note={note} setNote={(n)=>setNote(n)}/>)
    }

    setNote(null);
    return <></>
}

export default Notes
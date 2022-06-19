import { Entypo, AntDesign } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { FamilyContext } from '../../../../../Contexts/FamilyContext';
import { SocketContext } from '../../../../../Contexts/SocketContext';
import { INote } from '../../../../../Interfaces/Notes';
import NoteHeader from './NoteHeader';
import NoteText from './NoteText';

interface Props
{
    note:INote,
    setNote:(n:INote)=>void,
    back:()=>void
}

function NoteEdit({note,setNote,back}:Props)
{
    const [editNote,setEditNote] = useState(note);
    const [editHeader,setEditHeader] = useState(false);
    const [editText,setEditText] = useState(false);

    const {socket} = useContext(SocketContext);
    const {family} = useContext(FamilyContext);

    useEffect(()=>{
        socket?.on("C-FamilySocial-Notes-Header",data=>{
            if(data.id !== note.id){return;}
            setEditNote(data);
        });

        socket?.on("C-FamilySocial-Notes-Text",data=>{
            if(data.id !== note.id){return;}
            setEditNote(data);
        });
    },[]);

    return(
        <View style={styles.container}>
            <View style={styles.headerMain}>
                <NoteHeader edit={editHeader} note={editNote} setEdit={setEditHeader} setNote={setNote}/>
                {editText || editHeader ?
                <View>
                    <TouchableOpacity onPress={()=>{setEditText(false);setEditHeader(false)}}><Entypo name="check" size={50} color="black" /></TouchableOpacity>
                </View>:<View>
                    <TouchableOpacity onPress={back}><AntDesign name="back" size={50} color="black" /></TouchableOpacity>
                </View>}
            </View>
            <View>
                <NoteText edit={editText} note={editNote} setEdit={setEditText} setNote={setNote}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:"100%"
    },
    headerMain:{
        height:48,
        width:350,
        display:"flex",
        marginTop:10,
        flexDirection:"row",
    },
});

export default NoteEdit
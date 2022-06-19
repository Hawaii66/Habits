import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native'
import { FamilyContext } from '../../../../../Contexts/FamilyContext';
import { SocketContext } from '../../../../../Contexts/SocketContext';
import { INote } from '../../../../../Interfaces/Notes';

interface Props
{
    note:INote,
    setNote:(n:INote)=>void
    edit:boolean,
    setEdit:(b:boolean)=>void
}

function NoteHeader({note, setNote, edit, setEdit}:Props)
{
    const [headerText, setHeaderText] = useState(note.header);

    const {family} = useContext(FamilyContext);
    const {socket} = useContext(SocketContext);

    const endEdit = () => {
        var newNote = {...note};
        newNote.header = headerText;
        setNote(newNote);
    }

    const editHeader = (str:string) => {
        setHeaderText(str);
        socket?.emit("S-FamilySocial-Notes-Header",{
            familyID:family.id,
            noteID:note.id,
            header:str
        });
    }

    useEffect(()=>{
        setHeaderText(note.header);
    },[note])

    if(edit)
    {
        return(<View style={styles.header}>
            <TextInput
                style={styles.headerText}
                onChangeText={(str)=>editHeader(str.substring(0,20))}
                value={headerText}
                placeholder=""
                keyboardType="default"
                autoCapitalize='words'
                autoFocus={true}
                enablesReturnKeyAutomatically={true}
                maxLength={20}
                onEndEditing={endEdit}
                returnKeyType="done"
            />
        </View>)
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>setEdit(true)}>
                <Text style={styles.headerText}>{note.header === "" ? "Header" : headerText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width:"85%",
        height:48,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    headerText:{
        textAlign:"center",
        color:"#fff",
        fontWeight:"900",
        fontSize:26
    }
});

export default NoteHeader
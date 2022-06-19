import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, Text } from 'react-native'
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

function NoteText({note, setNote, edit, setEdit}:Props)
{
    const [text, setText] = useState(note.text);

    const {family} = useContext(FamilyContext);
    const {socket} = useContext(SocketContext);

    const endEdit = () => {
        var newNote = {...note};
        newNote.header = text;
        setNote(newNote);
    }

    const editText = (str:string) => {
        setText(str);
        socket?.emit("S-FamilySocial-Notes-Text",{
            familyID:family.id,
            noteID:note.id,
            text:str
        });
    }

    useEffect(()=>{
        setText(note.text);
    },[note]);

    if(edit){
        return (
            <KeyboardAvoidingView
                behavior='height'
            >
                <ScrollView style={styles.scrollViewKeyboard}>
                    <TextInput
                        style={styles.mainText}
                        value={text}
                        onChangeText={editText}
                        placeholder=""
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoFocus={true}
                        multiline={true}
                        onEndEditing={endEdit}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    return(
        <ScrollView style={styles.scrollView}>
            <Text onPress={()=>setEdit(true)} style={[styles.maxHeight, styles.mainText]}>{text}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    maxHeight:{
        minHeight:480
    },
    scrollView:{
        marginHorizontal: 30,
        marginTop:12,
        marginBottom:110,
        minHeight:40
    },
    scrollViewKeyboard:{
        marginHorizontal: 30,
        marginTop:12,
        minHeight:40
    },
    mainText:{
        fontSize:28,
        color:"#fff"
    }
});

export default NoteText
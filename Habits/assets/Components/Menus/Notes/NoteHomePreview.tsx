import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { INote } from '../../../Interfaces/Notes'
import { AntDesign } from '@expo/vector-icons'; 

interface Props
{
    note:INote,
    onSelect:()=>void,
    del:boolean,
    delPress:()=>void
}

function NoteHomePreview({note,onSelect, del, delPress}:Props) {
    const trim = (text:string) => {
        if(text === ""){return "Nothing has been writen yet. Press here to start edit this note"}
        return text;
    }

    const getTime = (time:number) => {
        const date = new Date(time);
        var minute:string|number = date.getMinutes();
        if(minute < 9){minute = `0${minute}`}
        return `${date.toDateString()} ${date.getHours()}:${minute}`
    }

    const press = () => {
        if(!del){onSelect();}
    }

    const delBtnClicked = () => {
        if(del){delPress()}
    }

    return (
        <View style={styles.note}>
            <TouchableOpacity onPress={press}>
                <View style={styles.container}>
                    <Text style={styles.header}>{note.header !== "" ? note.header : "Press me"}</Text>
                    <Text style={styles.text}>{trim(note.text)}</Text>
                    <Text style={styles.update}>{getTime(note.lastUpdated)}</Text>
                </View>
                {del && <View style={styles.delete}><TouchableOpacity onPress={delBtnClicked}><AntDesign name="delete" size={30} color="black" /></TouchableOpacity></View>}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    note:{
        width:160,
        height:160,
        overflow:"hidden",
        borderRadius:15,
        backgroundColor:"#79828B",
        display:"flex",
        flexDirection:"row",
        margin:10,
    },
    container:{
        margin:10,
        position:"relative"
    },
    header:{
        width:140,
        height:30,
        fontSize:20,
        textAlign:"center",
        color:"#fff",
        textDecorationStyle:'solid',
        textDecorationLine:'underline'
    },
    text:{
        width:140,
        height:100,
        fontSize:16,
        color:"#fff"
    },
    update:{
        width:140,
        height:15,
        fontSize:12,
        color:"#fff"
    },
    delete:{
        width:30,
        height:30,
        position:"absolute",
        top:5,
        right:5,
    }
})

export default NoteHomePreview
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';

interface Props
{
    sort:()=>void,
    create:()=>void,
    del:()=>void,
    deleting:boolean
}

function NoteHomeEdit({sort,create,del,deleting}:Props) {
    return (
        <View style={styles.container}>
            <View style={styles.note}>
                <TouchableOpacity onPress={create} style={styles.btn}><Ionicons name="create" size={54} color="white" /></TouchableOpacity>
                <TouchableOpacity onPress={sort} style={styles.btn}><FontAwesome5 name="sort-amount-down-alt" size={50} color="white" /></TouchableOpacity>
                <TouchableOpacity onPress={del} style={styles.btn}>{
                    !deleting ? 
                    <AntDesign name="delete" size={54} color="white" /> :
                    <MaterialIcons name="cancel" size={54} color="white" />
                }</TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:160,
        height:160,
        overflow:"hidden",
        borderRadius:15,
        backgroundColor:"#0000001f",
        margin:10,
    },
    note:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
    },
    btn:{
        width:70,
        height:70,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#353B48",
        margin:5,
        overflow:"hidden",
        borderRadius:24
    }
})

export default NoteHomeEdit
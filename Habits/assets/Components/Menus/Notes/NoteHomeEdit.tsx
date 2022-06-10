import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
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
                <TouchableOpacity onPress={create} style={[styles.btn,styles.create]}><Ionicons name="create" size={54} color="black" /></TouchableOpacity>
                <TouchableOpacity onPress={sort} style={[styles.btn, styles.sort]}><FontAwesome name="sort-numeric-asc" size={54} color="black" /></TouchableOpacity>
                <TouchableOpacity onPress={del} style={[styles.btn, styles.sort]}>{
                    !deleting ? 
                    <AntDesign name="delete" size={54} color="black" /> :
                    <MaterialIcons name="cancel" size={54} color="black" />
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
        backgroundColor:"#79828B",
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
        backgroundColor:"#E74C3C",
        margin:5,
        overflow:"hidden",
        borderRadius:24
    },
    sort:{

    },
    create:{

    }
})

export default NoteHomeEdit
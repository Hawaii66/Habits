import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Animated, Easing} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { INote } from '../../../Interfaces/Notes'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import NoteMainText from './NoteMainText';
import { uploadData } from '../../../Contexts/StaticContext';

interface Props
{
    note:INote,
    back:()=>void
}

function NoteView({note,back}:Props) {
    const [editHeader,setEditHeader] = useState(false);
    const [headerText, setHeaderText] = useState(note.header);

    const [editText,setEditText] = useState(false);
    const [mainText, setMainText] = useState(note.text);

    const [loading, setLoading] = useState(false);
    let rotateValueHolder = new Animated.Value(0);
    var refTest = useRef(rotateValueHolder);

    const endHeaderEdit = () => {
        if(headerText.length === 0){setHeaderText("No header");}
    }

    const save = async () => {
        setLoading(true);
        startImageRotateFunction();
        await uploadData(`/notes/private/update/${note.id}`, "POST", {
            text:mainText,
            header:headerText
        });
        back();
    }

    const returnBack = async () => {
        await save();
    }

    const startImageRotateFunction = () => {
        refTest.current.setValue(0);
        Animated.timing(refTest.current, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => startImageRotateFunction());
    };

    if(loading)
    {
        return(
            <>
                <Animated.View style={{
                    transform:[{rotate:refTest.current.interpolate({
                        inputRange:[0,1],
                        outputRange:["0deg","360deg"]
                    })}]
                }}><AntDesign name="loading1" size={50} color="black" /></Animated.View>
                <Text style={styles.savingText}>Saving changes...</Text>
            </>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerMain}>
                <View style={styles.header}>
                    {editHeader ? 
                        <TextInput
                            style={styles.headerText}
                            onChangeText={(str)=>setHeaderText(str.substring(0,20))}
                            value={headerText}
                            placeholder=""
                            keyboardType="default"
                            autoCapitalize='words'
                            autoFocus={true}
                            enablesReturnKeyAutomatically={true}
                            maxLength={20}
                            onEndEditing={endHeaderEdit}
                            returnKeyType="done"
                        /> : 
                    <TouchableOpacity onPress={()=>setEditHeader(s=>!s)}>
                        <Text style={styles.headerText}>{note.header === "" ? "Header" : note.header}</Text>
                    </TouchableOpacity> }
                </View>
                {editText || editHeader ?
                <View>
                    <TouchableOpacity onPress={()=>{setEditText(false);setEditHeader(false)}}><Entypo name="check" size={50} color="black" /></TouchableOpacity>
                </View>:<View>
                    <TouchableOpacity onPress={returnBack}><AntDesign name="back" size={50} color="black" /></TouchableOpacity>
                </View>}
            </View>
            <NoteMainText 
                changeText={(val)=>setMainText(val)}
                editText={editText}
                mainText={mainText}
                setEditText={setEditText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    savingText:{
        fontSize:30,
        fontWeight:"700"
    },
    container:{
        height:"100%",
    },
    headerMain:{
        height:48,
        width:350,
        display:"flex",
        marginTop:25,
        flexDirection:"row",
    },
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
})

export default NoteView
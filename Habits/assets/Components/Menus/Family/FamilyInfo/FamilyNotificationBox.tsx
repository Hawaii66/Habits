import React from 'react'
import { StyleSheet, View, Text, Button, InputAccessoryView, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

interface Props
{
    type:"HEADER"|"BODY",
    text:string,
    setText:(text:string)=>void
}

function FamilyNotificationBox({type,text,setText}:Props)
{
    const inputAccessoryViewID = type;
    return(
        <View style={type === "BODY" ? styles.body : styles.header}>
            <Text style={styles.headerText}>{type}</Text>
            <View style={type === "BODY" ? styles.bodyInput : styles.headerInput}>
                <TextInput maxLength={type === "BODY" ? 60 : 30} inputAccessoryViewID={inputAccessoryViewID} style={styles.textInput} multiline={type === "BODY" ? true : false} value={text} onChangeText={(val)=>setText(val)}/>
            </View>
            <InputAccessoryView backgroundColor={"#fff"} nativeID={inputAccessoryViewID}>
                <View style={styles.optionsBar}>
                    <Text style={styles.previewText}>{text}</Text>
                    <View style={styles.textInputMenu}>
                        <TouchableOpacity style={styles.doneBtn} onPress={() => Keyboard.dismiss()}>
                            <AntDesign name="checkcircle" size={40} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </InputAccessoryView>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        width:220,
        height:90
    },
    header:{
        width:220,
        height:90
    },
    bodyInput:{
        width:220,
        height:60,
        borderWidth:3,
        borderColor:"#000"
    },
    headerInput:{
        width:220,
        height:40,
        borderWidth:3,
        borderColor:"#000"
    },
    headerText:{
        width:220,
        height:30,
        fontSize:24,
        fontWeight:"600",
        color:"#fff"
    },
    textInput:{
        color:"#fff",
        height:"100%",
        marginHorizontal:5
    },
    doneBtn:{
        width:40,
        height:40,
        overflow:"hidden",
        borderRadius:15,
        marginRight:15
    },
    textInputMenu:{
        margin:5,
        width:375,
        display:"flex",
        alignItems:"flex-end",
        flex:1
    },
    previewText:{
        height:40,
        flex:9,
        marginLeft:10,
        marginRight:50,
        textAlignVertical:"center"
    },
    optionsBar:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    }
});

export default FamilyNotificationBox
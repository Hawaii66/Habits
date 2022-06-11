import React from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

interface Props
{
    editText:boolean,
    setEditText:(state:boolean)=>void,
    mainText:string,
    changeText:(value:string)=>void
}

function NoteMainText({editText,setEditText,mainText,changeText}:Props)
{
    if(editText)
    {
        return(
            <KeyboardAvoidingView
            behavior='height'>
                <ScrollView style={styles.scrollViewKeyboard}>
                    <TextInput
                        style={styles.mainText}
                        value={mainText}
                        onChangeText={changeText}
                        placeholder=""
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoFocus={true}
                        multiline={true}
                        onEndEditing={()=>setEditText(false)}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    return(
        <ScrollView style={styles.scrollView}>
            <Text onPress={()=>setEditText(true)} style={[styles.maxHeight, styles.mainText]}>{mainText}</Text>
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

export default NoteMainText
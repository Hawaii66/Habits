import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, Button, TextInput, StyleSheet, ActionSheetIOS } from 'react-native'
import { NotiContext } from '../../../Contexts/NotificationContext'
import { FontAwesome } from '@expo/vector-icons';
import IOSPicker from 'react-native-ios-picker';

interface Props{
    edit:()=>void,
    text:string
}
function TimeButton({edit,text}:Props){
    return(
        <Text style={styles.editText}>
            {text}
            <TouchableOpacity onPress={edit}>
                <FontAwesome name="edit" size={30} color="black" />
            </TouchableOpacity>
        </Text>
    )
}

type EditButtons = "w"|"p"|"r"|"l"|"none";

function Pomodoro() {
    const [wTimer,setWTimer] = useState(25);
    const [pTimer,setPTimer] = useState(5);
    const [reps,setReps] = useState(3);
    const [long,setLong] = useState(30);

    const [timer,setTimer] = useState(0);
    const [repCounter,setRepCounter] = useState(0);

    const {notification, sendNotification} = useContext(NotiContext);
    const [edit,setEdit] = useState(false);

    const changeValue = (num:number, change:EditButtons) => {
        switch(change)
        {
            case "w":
                setWTimer(num);
                break;
            case "p":
                setPTimer(num);
                break;
            case "r":
                setReps(num);
                break;
            case "l":
                setLong(num);
                break;
        }
    }

    const changeTargetEdit = (val:EditButtons) => {
        onPress(val)
    }

    const onPress = (val:EditButtons) =>
        ActionSheetIOS.showActionSheetWithOptions(
        {
            options: GetValues(1,61),
        },
        buttonIndex => {
            changeValue(buttonIndex + 1, val);
        }
    );

    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={()=>setEdit(true)}><Text>Edit timers</Text></TouchableOpacity>
            
            {edit && <View style={styles.editMenu}>
                <TimeButton text={`Work: ${wTimer}`} edit={()=>changeTargetEdit("w")}/>
                <TimeButton text={`Pause: ${pTimer}`} edit={()=>changeTargetEdit("p")}/>
                <TimeButton text={`Reps: ${reps}`} edit={()=>changeTargetEdit("r")}/>
                <TimeButton text={`Long pause: ${long}`} edit={()=>changeTargetEdit("l")}/>
            </View>}
        </View>
    )
}

function GetValues(min:number,max:number)
{
    var arr = [];
    for(var i = 0; i < max - min; i ++)
    {
        arr.push((i + min).toString());
    }
    return arr;
}

const styles = StyleSheet.create({
    main:{
        minWidth:350
    },
    container: {
    flex: 1,
    justifyContent: 'center',
  },
  result: {
    fontSize: 64,
    textAlign: 'center',
  },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      minWidth:300
    },
    editMenu:{
        minWidth:250,
        minHeight:150,
        borderColor:"#bdc3c7",
        borderWidth:1,
        borderRadius:20,
        backgroundColor:"red",
        display:"flex",
        padding:10,
    },
    editText:{
        fontSize:25
    }
  });

export default Pomodoro
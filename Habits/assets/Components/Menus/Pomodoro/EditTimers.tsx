import React, { useEffect } from 'react'
import { TouchableOpacity, View, Text, Button, TextInput, StyleSheet, ActionSheetIOS } from 'react-native'
import { NotiContext } from '../../../Contexts/NotificationContext'
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EditButtons } from './Pomodoro';

interface Props{
    setTimer: (key:EditButtons, num:number) => void,
    wTimer:number,
    pTimer:number,
    rTimer:number,
    lTimer:number
}

interface TimeButtonProps{
    edit:()=>void,
    text:string
}

function TimeButton({edit,text}:TimeButtonProps){
    return(
        <Text style={styles.editText}>
            {text}
            <TouchableOpacity onPress={edit}>
                <FontAwesome name="edit" size={30} color="black" />
            </TouchableOpacity>
        </Text>
    )
}

function EditTimers({wTimer,pTimer,rTimer,lTimer,setTimer}:Props) {
    useEffect(()=>{
        const getTimes = async ()=>{
            setTimer("w", await getTimer("w",25));
            setTimer("p", await getTimer("p",5));
            setTimer("r", await getTimer("r",4));
            setTimer("l", await getTimer("l",30));
        }
        getTimes();
    },[])
    
    const getTimer = async(key:EditButtons, def:number) => {
        try{
            return await AsyncStorage.getItem(key);
        }catch(e){
            console.log("Error getting timer: ", e);
            return def;
        }
    }

    const storeTimer = async (key:string,time:number) => {
        try {
            await AsyncStorage.setItem(key, time.toString())
        }catch(e){
            console.log("Storage error: ", e);
        }
    }
    
    const changeValue = async (num:number, change:EditButtons) => {
        await storeTimer(change, num);

        setTimer(change,num);
    }

    const onPress = (val:EditButtons) => {
        const map:Record<EditButtons,number> = {
            "w":59,
            "p":59,
            "r":6,
            "l":59,
            "none":0
        }

        ActionSheetIOS.showActionSheetWithOptions(
        {
            options: GetValues(1,map[val])
        },
        buttonIndex => {
            changeValue(buttonIndex + 1, val);
        }
    )};

    return(
        <View style={styles.editMenu}>
            <TimeButton text={`Work: ${wTimer}`} edit={()=>onPress("w")}/>
            <TimeButton text={`Pause: ${pTimer}`} edit={()=>onPress("p")}/>
            <TimeButton text={`Reps: ${rTimer}`} edit={()=>onPress("r")}/>
            <TimeButton text={`Long pause: ${lTimer}`} edit={()=>onPress("l")}/>
        </View>
    )
}

function GetValues(min:number,max:number)
{
    var arr = [];
    for(var i = 0; i < max - min + 1; i ++)
    {
        arr.push((i + min).toString());
    }
    return arr;
}

const styles = StyleSheet.create({
    editMenu:{
        display:"flex",
        padding:10,
    },
    editText:{
        fontSize:25
    }
});

export default EditTimers
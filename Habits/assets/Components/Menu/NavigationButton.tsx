import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { INavType } from './Menu'
import { Entypo } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

interface Props{
    type:INavType,
    onClick:()=>void
}

function TypeToIcon(type:INavType){
    switch(type){
        case "Todo":
            return <Entypo name={"list"} size={30} color="black" />
        case "None":
            return <MaterialIcons name="error" size={30} color="black" />
        case 'Main':
            return <Entypo name={"arrow-up"} size={30} color="black" />
        case 'Person':
            return <MaterialIcons name="person" size={30} color="black" />
        case 'Family':
            return <Fontisto name="persons" size={30} color="black" />
        case 'Calendar':
            return <Entypo name="calendar" size={30} color="black" />
        case "Cross":
            return <Entypo name="cross" size={30} color="black" />
        case "Note":
            return <FontAwesome name="sticky-note-o" size={30} color="black" />
        case "List":
            return <FontAwesome name="list-alt" size={30} color="black" />
        case "Cal":
            return <FontAwesome name="calendar" size={30} color="black" />
        case "Times":
            return <MaterialIcons name="schedule" size={30} color="black" />
        case "Pomodoro":
            return <MaterialIcons name="timer" size={30} color="black" />
        case "Timer":
            return <MaterialIcons name="timer-10" size={30} color="black" />
        case "Shopping":
            return <Entypo name="shopping-basket" size={30} color="black" />
        case "Notes":
            return <FontAwesome5 name="sticky-note" size={30} color="black" />
        case "Family-Manager":
            return <MaterialIcons name="settings" size={30} color="black" />
        case "Notification":
            return <Ionicons name="notifications-sharp" size={30} color="black" />
    }
}

function NavigationButton({type, onClick}:Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onClick}>
            {TypeToIcon(type)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        margin:3,
        padding:10,
        backgroundColor:"#bdc3c7",
        borderColor:"#95a5a6",
        borderWidth:3,
        borderRadius:100,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default NavigationButton
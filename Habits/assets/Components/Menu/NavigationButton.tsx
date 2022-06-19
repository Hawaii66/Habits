import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { INavType } from './Menu'
import { AntDesign, Entypo } from '@expo/vector-icons'; 
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
        case "Select":
            return <AntDesign name="questioncircle" size={30} color="black" />
        case "Select-Create":
            return <Ionicons name="create-outline" size={30} color="black" />
        case "Select-Edit":
            return <AntDesign name="edit" size={30} color="black" />
        case "Select-Select":
            return <FontAwesome name="group" size={30} color="black" />

        case "Family":
            return <MaterialIcons name="group" size={30} color="black" />
        case "Family-Chatt":
            return <Entypo name="chat" size={30} color="black" />
        case "Family-Food":
            return <Ionicons name="fast-food" size={30} color="black" />
        case "Family-Notes":
            return <FontAwesome name="sticky-note-o" size={30} color="black" />
        case "Family-Shopping":
            return <Entypo name="shopping-basket" size={30} color="black" />
        
        case "FamilyInfo":
            return <Ionicons name="information" size={30} color="black" />
        case "FamilyInfo-Notification":
            return <Ionicons name="notifications" size={30} color="black" />
        case "FamilyInfo-Vote":
            return <MaterialIcons name="how-to-vote" size={30} color="black" />

        case "Person":
            return <Ionicons name="person" size={30} color="black" />
        case "Person-Notes":
            return <FontAwesome name="sticky-note-o" size={30} color="black" />
        case "Person-Todo":
            return <Entypo name="list" size={30} color="black" />
        case "Person-Notification":
            return <Ionicons name="notifications" size={30} color="black" />


        case 'Main':
            return <Entypo name={"arrow-up"} size={30} color="black" />
        case "Cross":
                return <Entypo name="cross" size={30} color="black" />
        case "None":
            return <MaterialIcons name="error" size={30} color="black" />
        default:
            return <MaterialIcons name="error" size={30} color="black" />
        
            /*
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
        */
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
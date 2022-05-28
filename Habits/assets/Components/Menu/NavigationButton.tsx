import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { INavType } from './Menu'
import { Entypo } from '@expo/vector-icons'; 

interface Props{
    type:INavType
}

function TypeToIcon(type:INavType){
    switch(type){
        case "Todo":
            return "list"
        case "None":
            return "app-store"
    }
}

function NavigationButton({type}:Props) {
    return (
        <TouchableOpacity style={styles.button}>
            <Entypo name={TypeToIcon(type)} size={36} color="black" />
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
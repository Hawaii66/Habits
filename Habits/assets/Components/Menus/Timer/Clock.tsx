import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props{
    timer:number
}

function Clock({timer}:Props) {
    const getTimeString = () => {
        const hour = timer / 60;
        const rhour = Math.floor(hour);
        const minute = (hour - rhour) * 60;
        const rminute = Math.round(minute);
        return `${rhour.toString().length === 1 ? "0" : ""}${rhour}:${rminute.toString().length === 1 ? "0" : ""}${rminute}`;
    }

    return (
        <View style={styles.shadow}>
            <View style={styles.clock}>
                <Text style={styles.text}>{getTimeString()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    shadow:{
        shadowColor:"#000",
        shadowOpacity:0.5,
        shadowRadius:15
    },
    clock:{
        width:338,
        height:168,
        borderRadius:15,
        overflow:"hidden",
        backgroundColor:"#353B48",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:37
    },
    text:{
        fontSize:96,
        fontWeight:"900",
        color:"#000000",
    }
})

export default Clock
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

interface Props
{
    addItem:()=>void,
    disable:boolean
}

function VoteCreateAdd({addItem,disable}:Props)
{
    return(
        <View style={styles.item}>
            <View style={styles.shadow}>
                <TouchableOpacity 
                    onPress={()=>addItem()} 
                    style={styles.textWrapper}
                    disabled={disable}
                >
                        <Text style={styles.text}>Add Alternative</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        width:315,
        height:60,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    textWrapper:{
        width:280,
        height:60,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#535C68",
        borderRadius:16,
        overflow:"hidden"
    },
    text:{
        fontWeight:"500",
        color:"#fff",
        fontSize:30
    },
    shadow:{
        shadowColor:"#000",
        elevation:2,
        shadowOffset:{
            height:0,
            width:0
        },
        shadowOpacity:0.5,
        shadowRadius:15
    },
});

export default VoteCreateAdd
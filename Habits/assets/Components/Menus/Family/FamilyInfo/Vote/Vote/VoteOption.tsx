import { Entypo } from '@expo/vector-icons';
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

interface Props
{
    name:string,
    choose:()=>void,
    selected:boolean,
    space:boolean
}

function VoteOption({space,name,choose,selected}:Props)
{
    return(
        <View style={[styles.option, space && styles.space]}>
            <TouchableOpacity
                style={styles.full}
                onPress={()=>choose()}
            >
                <View style={styles.container}>
                    <View style={styles.selectWrapper}>
                        <View style={styles.select}>
                            {selected && <Entypo name="cross" size={32} color="black" />}
                        </View>
                    </View>
                    <View style={styles.nameWrapper}>
                        <Text style={styles.name}>{name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    option:{
        width:300,
        height:50,
    },
    full:{
        width:"100%",
        height:"100%",
    },
    container:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row",
    },
    selectWrapper:{
        width:50,
        height:50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    select:{
        width:40,
        height:40,
        borderRadius:5,
        borderWidth:4,
        borderColor:"#000",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    nameWrapper:{
        height:50,
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start"
    },
    name:{
        marginLeft:10,
        textAlign:"left",
        color:"#fff",
        fontSize:24,
        fontWeight:"700"
    },
    space:{
        marginTop:15
    }
});

export default VoteOption
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IVoteAlternative } from '../../../../../../Interfaces/Family';

interface Props
{
    alternative:IVoteAlternative,
    setName:(name:string)=>void,
    deleteAlternative:()=>void
}

function VoteCreateItem({alternative,setName,deleteAlternative}:Props)
{
    const [edit,setEdit] = useState(false);
    const [tempName,setTemp] = useState(alternative.name);

    return (
        <View style={styles.item}>
            <View style={styles.dotMargin}><View style={styles.dot}></View></View>
            {edit ? 
            <TextInput
                style={styles.text}
                autoFocus={true}
                value={tempName}
                onChangeText={(newName)=>setTemp(newName)}
                onEndEditing={()=>{
                    setName(tempName);
                    setEdit(false);
                }}
                maxLength={15}
                keyboardType={"default"}
                enablesReturnKeyAutomatically
            />
            : <TouchableOpacity onPress={()=>setEdit(true)} style={styles.textWrapper}><Text style={styles.text}>{alternative.name}</Text></TouchableOpacity>                
        }
            <TouchableOpacity
                onPress={deleteAlternative}
            >
                <MaterialIcons name="delete" size={30} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        width:315,
        height:60,
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row"
    },
    dotMargin:{
        width:60,
        height:60,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    dot:{
        width:15,
        height:15,
        backgroundColor:"#fff",
        borderRadius:60,
        overflow:"hidden"
    },
    textWrapper:{
        width:225,
        height:60,
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
    },
    text:{
        textAlign:"left",
        color:"#fff",
        fontWeight:"500",
        fontSize:30
    }
});

export default VoteCreateItem
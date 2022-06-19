import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { FamilyContext } from '../../../../../../Contexts/FamilyContext';
import { uploadData } from '../../../../../../Contexts/StaticContext';
import { UserContext } from '../../../../../../Contexts/UserContext';
import { IVote } from '../../../../../../Interfaces/Family';
import VoteOption from './VoteOption';

interface Props
{
    vote:IVote,
    setVote:(vote:IVote)=>void,
}

function VoteAdd({vote,setVote}:Props)
{
    const [current,setCurrent] = useState(-1);

    const {family} = useContext(FamilyContext);
    const {user} = useContext(UserContext);

    const onChoose = (index:number) => {
        setCurrent(index);
    }

    const castVote = async () => {
        if(current === -1){return;}

        var voteChoice = current;
        if(voteChoice === vote.alternatives.length){voteChoice = -1;}

        const newVote = await uploadData(`/family/votes/vote`,"POST",{
            familyID:family.id,
            email:user.email,
            voteIndex:voteChoice
        });

        if(!newVote.success){return;}

        setVote(newVote.data);
    }

    const getData = () => {
        var data:string[] = [];
        vote.alternatives.forEach(item=>data.push(item.name));
        data.push("Pass")
        return data;
    }

    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>Cast your vote</Text>
            <View style={styles.alternatives}>
                <FlatList 
                    data={getData()}
                    renderItem={(item)=>{
                        return <VoteOption space={item.index === vote.alternatives.length} key={item.index} name={item.item} choose={()=>onChoose(item.index)} selected={item.index === current}/>
                    }}
                />
            </View>
            <TouchableOpacity
                disabled={current === -1}
                style={[styles.voteBtn, current === -1 && styles.disable]}
                onPress={castVote}
            >
                <Text style={[styles.voteText, current === -1 && styles.disableText]}>{current === -1 ? "Choose" : "Vote"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    headerText:{
        color:"#fff",
        fontSize:36,
        fontWeight:"800",
        marginBottom:10,
    },
    alternatives:{
        width:300,
        height:320,
        marginBottom:20,
    },
    break:{
        height:30
    },
    voteBtn:{
        width:240,
        height:60,
        backgroundColor:"#576574",
        borderRadius:16,
        overflow:"hidden",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    voteText:{
        fontSize:36,
        color:"#fff",
        fontWeight:"900"
    },
    disable:{
        backgroundColor:"#57657444"
    },
    disableText:{
        color:"#ffffff44"
    }
});

export default VoteAdd
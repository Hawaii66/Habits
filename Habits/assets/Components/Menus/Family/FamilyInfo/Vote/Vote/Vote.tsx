import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View, Text, Switch, Alert } from 'react-native'
import { IFamily, IVote } from '../../../../../../Interfaces/Family';
import {PieChart} from "react-native-chart-kit";
import { FontAwesome } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { FamilyContext } from '../../../../../../Contexts/FamilyContext';
import { getData } from '../../../../../../Contexts/StaticContext';

interface Props
{
    vote:IVote
    refresh:()=>void
}

function VoteToPieData(vote:IVote):any[] {
    const colors:string[] = ["#F4BFBF","#DEB6AB","#FFD9C0","#FAF0D7","#C2DED1","#8CC0DE"];

    var data: any[] = [];
    vote.alternatives.forEach((alternative,index) => {
        data.push({
            name:alternative.name,
            votes:alternative.votes,
            color:colors[index],
            legendFontColor:"#95afc0",
            legendFontSize:15
        });
    });
    data = data.sort((a,b)=>a.votes-b.votes).reverse();
    return data;
}

const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
}

function GetNoVoters(vote:IVote,family:IFamily)
{
    var noVoters:string[] = [...family.members];
    vote.alternatives.forEach((arr) => {
        arr.voters.forEach(item=>{
            const index = noVoters.indexOf(item);
            if(index !== -1)
            {
                noVoters.splice(index, 1);
            }
        });
    });
    vote.passers.forEach(item => {
        const index = noVoters.indexOf(item);
        if(index !== -1)
        {
            noVoters.splice(index, 1);
        }
    });
    return noVoters;
}

function GetStatArray(vote:IVote, family:IFamily){
    const totalVotes = vote.alternatives.reduce((prev,value)=>prev+=value.votes,vote.passes)
    const totalVoters = `Total votes: ${totalVotes} / ${family.members.length}`;
    const voters = `π Voters: ${totalVotes - vote.passes} / ${family.members.length}`;
    const passers = `Passers: ${vote.passes}`;
    var passersEmail = GetNoVoters(vote,family);
    var passersNew:string[] = [];
    passersEmail.forEach(item=>passersNew.push(`- ${item}`));
    const haventVoted = `Hasn't voted: ${passersEmail.length}`;

    const result = [
        totalVoters,
        voters,
        passers,
        "",
        haventVoted,
        ...passersNew
    ] 
    return result;
}

function Vote({vote,refresh}:Props)
{
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    //To remove infinite updates store the data in a useState
    const [data,setData] = useState<any[]>([]);
    useEffect(()=>setData(VoteToPieData(vote)),[vote]);

    const {family,setFamily} = useContext(FamilyContext);
    
    const hasVotes = (data:any[]) => {
        var hasFoundVoteCount = 0;
        data.forEach(item=>{
            if(item.votes > 0){hasFoundVoteCount += 1;}
        });
        return hasFoundVoteCount > 0;
    }

    const deleteVote = async () => {
        const result = await getData(`/family/votes/delete/${family.id}`);
        setFamily(result.data);
    }

    const deleteAlert = () => {
        Alert.alert("Delete Vote?", "Are you sure you want to delete the current vote.", [
            {
                text:"Yes",
                onPress:deleteVote
            },{
                text:"No",
                onPress:()=>{}
            },
        ]);
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{vote.name}</Text>
                <View style={styles.refresh}>
                    <TouchableOpacity
                        onPress={()=>refresh()}
                    >
                        <FontAwesome name="refresh" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={deleteAlert}
                        style={styles.delete}
                    >
                        <FontAwesome name="trash" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            {hasVotes(data) ? 
            <PieChart
                data={data}
                width={Dimensions.get("window").width}
                height={215}
                chartConfig={chartConfig}
                accessor={"votes"}
                backgroundColor={"transparent"}
                paddingLeft={"5"}
                absolute={isEnabled}
            />
            :<View style={styles.noDataWrapper}><Text style={styles.noData}>Ingen har röstat</Text></View>}
            <View style={styles.stats}>
                <View style={styles.statHeader}>
                    <Text style={styles.statistics}>Statistics</Text>
                    {hasVotes(data) && <Switch
                        style={styles.statOption}
                        trackColor={{ false: '#576574', true: '#576574' }}
                        thumbColor={isEnabled ? '#dff9fb' : '#dff9fb'}
                        ios_backgroundColor="#576574"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />}
                </View>
                <FlatList
                    style={styles.statList}
                    data={GetStatArray(vote,family)}
                    renderItem={info=>{
                        if(info.item === ""){
                            return<View style={styles.break}></View>
                        } 
                        return <Text style={styles.statText}>{info.item}</Text>
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:375,
        height:"70%",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    headerText:{
        fontSize:40,
        color:"#fff",
        textAlign:"center",
        textDecorationLine:'underline',
        textDecorationStyle:'solid',
        fontWeight:"bold"
    },
    header:{
        width:"100%",
        height:50,
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"row"
    },
    refresh:{
        width:50,
        height:50,
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row"
    },
    stats:{
        width:315,
        height:200,
    },
    statText:{
        fontSize:20,
        color:"#fff",
        fontWeight:"600"
    },
    statistics:{
        fontSize:30,
        color:"#fff",
        fontWeight:"900"
    },
    break:{
        marginBottom:20
    },
    statList:{
        height:400
    },
    statHeader:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row"
    },
    statOption:{
        position:"relative",
        top:-10
    },
    noData:{
        textAlign:"center",
        color:"#fff",
        fontSize:24,
        fontWeight:"800"
    },
    noDataWrapper:{
        width:375,
        height:200,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    delete:{
        marginLeft:20
    }
});

export default Vote
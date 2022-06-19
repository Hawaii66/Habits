import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { FamilyContext } from '../../../../../Contexts/FamilyContext';
import { getData } from '../../../../../Contexts/StaticContext';
import { UserContext } from '../../../../../Contexts/UserContext';
import { IVote } from '../../../../../Interfaces/Family';
import VoteCreate from './Create/VoteCreate';
import Vote from './Vote/Vote';
import VoteAdd from './Vote/VoteAdd';

interface Props
{

}

function FamilyVote({}:Props)
{
    const [vote,setVote] = useState<IVote>({
        alternatives:[],
        familyID:"",
        id:"",
        name:"",
        passes:0,
        passers:[]
    });

    const {family,refreshFamily} = useContext(FamilyContext);
    const {user} = useContext(UserContext);

    const fetchVote = async () => {
        const result = await getData(`/family/votes/get/${family.id}`);
        const data:IVote = result.data;
        setVote(data); 
    }

    const refreshVotes = async () => {
        fetchVote();
        refreshFamily();
    }

    const hasVoted = (name:string) => {
        var has = false;
        vote.alternatives.forEach(item=>{if(item.voters.includes(name)){has=true}});
        if(vote.passers.includes(name)){has = true;}
        return has;
    }

    useEffect(() => {
        fetchVote();
    },[]);

    if(family.voteID === "")
    {
        return <VoteCreate refresh={()=>refreshVotes()} />
    }

    if(hasVoted(user.email))
    {
        return <Vote refresh={()=>fetchVote()} vote={vote} />
    }

    return <VoteAdd setVote={(v)=>setVote(v)} vote={vote}/>
}

function GetTotalVoters(vote:IVote):number
{
    var total = vote.passes;
    vote.alternatives.reduce((prev, current)=>prev += current.votes, total);
    return total;
}

const styles = StyleSheet.create({

});

export default FamilyVote
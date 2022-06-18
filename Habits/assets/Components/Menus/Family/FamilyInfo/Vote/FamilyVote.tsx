import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { FamilyContext } from '../../../../../Contexts/FamilyContext';
import { getData } from '../../../../../Contexts/StaticContext';
import { IVote } from '../../../../../Interfaces/Family';
import VoteCreate from './Create/VoteCreate';

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
        passes:0
    });

    const {family} = useContext(FamilyContext);

    const fetchVote = async () => {
        const result = await getData(`/family/vote/${family.voteID}`);
        const data:IVote = result.data;
        setVote(data); 
    }

    useEffect(() => {
        fetchVote();
    });

    if(family.voteID === "")
    {
        return <VoteCreate refresh={()=>{}} />
    }

    if(family.members.length === GetTotalVoters(vote))
    {
        return <></>//<VoteDone />
    }

    return <></>//<VoteInProgress />
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
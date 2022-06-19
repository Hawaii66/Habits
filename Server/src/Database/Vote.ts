import { IFamily, IVote } from "../Interfaces/Family";
import { families, votes } from "./Database";
import { GetRandomID } from "./Family";

type CreateVoteType = (vote:IVote) => Promise<IVote>;
type GetVoteType = (familyID:string) => Promise<IVote|null>;
type AddVoteType = (familyID:string, voteIndex:number, email:string) => Promise<IVote|null>;
type DeleteVoteType = (familyID:string) => Promise<IFamily>;

export const CreateVote:CreateVoteType = async (vote) => {
    const id = GetRandomID("vote");
    vote.id = id;
    const newVote:IVote = await votes.insert(vote);

    await families.findOneAndUpdate({id:vote.familyID},{$set:{voteID:id}});

    return newVote;
}

export const GetVote:GetVoteType = async (id) => {
    const vote:IVote|null = await votes.findOne({familyID:id});
    return vote;
}

export const AddVote:AddVoteType = async (familyID, voteIndex, email) => {
    var vote = await GetVote(familyID);
    if(vote === null){return null;}
    if(vote.alternatives.length < voteIndex && voteIndex !== -1){return null;}
    
    var hasVoted = false;
    vote.alternatives.forEach(item=>{if(item.voters.includes(email)){hasVoted = true;}});
    vote.passers.forEach(item=>{if(item.includes(email)){hasVoted = true;}});
    if(hasVoted){return null;}

    if(voteIndex >= 0)
    {
        vote.alternatives[voteIndex].votes += 1;
        vote.alternatives[voteIndex].voters.push(email);
    }else{
        vote.passes += 1;
        vote.passers.push(email);
    }

    const newVote:IVote|null = await votes.findOneAndUpdate({familyID:familyID},{$set:vote});
    return newVote;
}

export const DeleteVote:DeleteVoteType = async (familyID) => {
    await votes.findOneAndDelete({familyID:familyID});
    const family:IFamily = await families.findOneAndUpdate({id:familyID},{$set:{voteID:""}});
    return family;
}
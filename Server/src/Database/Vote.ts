import { IVote } from "../Interfaces/Family";
import { families, votes } from "./Database";
import { GetRandomID } from "./Family";

type CreateVoteType = (vote:IVote) => Promise<IVote>;
type GetVoteType = (familyID:string) => Promise<IVote|null>;

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
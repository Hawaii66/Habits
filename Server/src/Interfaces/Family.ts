import { INote } from "./Notes"

export interface IGoods
{
    id:string,
    amount:number,
    done:boolean,
    name:string
}

export interface IStore
{
    id:string,
    goods:IGoods[]
}

export interface IFamily
{
    name:string,
    id:string,
    members:string[], //Email array
    shopping:IStore[],
    notes:INote[],
    voteID:string
}

export interface Vote
{
    name:string,
    id:string,
    familyID:string,
    alternatives:VoteAlternative[],
}

export interface VoteAlternative
{
    name:string,
    votes:number,
    voters:string[] //Email IDs
}
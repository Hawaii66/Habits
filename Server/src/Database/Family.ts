import { IFamily } from "../Interfaces/Family";
import { families } from "./Database";

type CreateFamilyType = (member:string) => Promise<IFamily>;
type AddMemberType = (id:string, member:string) => Promise<void>;
type GetFamiliesType = (member:string) => Promise<IFamily[]>;
type RemoveMemberType = (id:string, member:string) => Promise<void>;
type ChangeNameType = (id:string, name:string) => Promise<void>;
type GetFamilyType = (id:string) => Promise<IFamily|null>;

export const ChangeName:ChangeNameType = async (id, name) => {
    families.findOneAndUpdate({id:id},{$set:{name:name}});
}

export const RemoveMember:RemoveMemberType = async (id, member) => {
    var family = await GetFamily(id);
    if(family === null){return;}

    family.members.splice(family.members.indexOf(member), 1);
    families.findOneAndUpdate({id:id},{$set:family});
}

export const GetFamilies:GetFamiliesType = async (member) => {
    const allFamilies:IFamily[] = await families.find();
    var acctual:IFamily[] = [];
    allFamilies.forEach(fam=>{
        if(fam.members.includes(member))
        {
            acctual.push(fam);
        }
    });
    return acctual;
}

export const AddMember:AddMemberType = async (id, member) => {
    var family = await GetFamily(id);
    if(family === null){return}

    family.members.push(member);
    await families.findOneAndUpdate({id:id},{$set:family});
}

export const GetFamily:GetFamilyType = async (id) => {
    const fam:IFamily = await families.findOne({id:id});
    if(fam === null || fam == undefined){return null}
    return fam;
}

export const CreateFamily:CreateFamilyType = async (member) => {
    const family:IFamily = {
        id:GetRandomID("family"),
        members:[member],
        name:"Family",
        notes:[],
        shopping:[],
        voteID:""
    }

    const newFamily:IFamily = await families.insert(family);
    return newFamily;
}

export function GetRandomID(name:string)
{
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":" + name;
    return randomID;
}
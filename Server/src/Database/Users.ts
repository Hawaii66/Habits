import { IUser } from "../Interfaces/User";
import { users } from "./Database";

type UserExistsType = (email:string) => Promise<boolean>;
type AddUserType = (user:IUser) => Promise<boolean>;
type GetUserType =(id:string) => Promise<IUser>;

export const UserExists:UserExistsType = async (email) => {
    const user = await GetUserEmail(email);
    return user !== null;
}

export const AddUser:AddUserType = async (user) => {
    if(await UserExists(user.email))
    {
        return false;
    }

    await users.insert(user);
    return true;
}

export const GetUserID:GetUserType = async (id) => {
    const user:IUser = await users.findOne({appleID:id});
    return user;
}

export const GetUserEmail:GetUserType = async (email) => {
    const user:IUser = await users.findOne({email:email});
    return user;
}
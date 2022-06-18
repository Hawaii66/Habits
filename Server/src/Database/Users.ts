import { IUser } from "../Interfaces/User";
import { users } from "./Database";

type UserExistsType = (email:string) => Promise<boolean>;
type AddUserType = (user:IUser) => Promise<boolean>;
type GetUserType =(id:string) => Promise<IUser>;
type UpdateExpoPushTokenType = (email:string, token:string) => Promise<void>;

export const UpdateExpoToken:UpdateExpoPushTokenType = async (email, token) => {
    var user = await GetUserEmail(email);
    console.log(user);
    if(user.appleID !== "" && user.expoPushToken !== token)
    {
        console.log("SAVing user");
        user.expoPushToken = token;
        await users.findOneAndUpdate({email:email},{$set:user});
    }
}

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
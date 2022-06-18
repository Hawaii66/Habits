import React, { useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { IUser } from '../Interfaces/User';

interface Props{
    children:React.ReactNode
}

function UserWrapper({children}:Props) {
    const [user, setUser] = useState<IUser>({
        appleID:"001173.a0238b8b3ba740568625f3233c9e607f.2255",
        email:"hawaiilive@outlook.com",
        expoPushToken:"ExponentPushToken[n9T5DbMgtS0HQnN56rXFFJ]",
        name:"Sebastian Ahlman",
        username:"HawaiiDev",
    });
    const [expoToken,setToken] = useState("");

    return (
        <UserContext.Provider value={{setUser,user,expoToken,setToken}}>{children}</UserContext.Provider>
    ) 
}

export default UserWrapper
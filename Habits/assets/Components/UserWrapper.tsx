import React, { useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { IUser } from '../Interfaces/User';

interface Props{
    children:React.ReactNode
}

function UserWrapper({children}:Props) {
    const [user, setUser] = useState<IUser>({email:"hawaiilive@outlook.com",username:"HawaiiDev",name:"Sebastian Ahlman",appleID:""});

    return (
        <UserContext.Provider value={{setUser,user}}>{children}</UserContext.Provider>
    ) 
}

export default UserWrapper
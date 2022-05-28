import React, { useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { IUser } from '../Interfaces/User';

interface Props{
    children:React.ReactNode
}

function UserWrapper({children}:Props) {
    const [user, setUser] = useState<IUser>({email:"",username:"",name:"",appleID:""});

    return (
        <UserContext.Provider value={{setUser,user}}>{children}</UserContext.Provider>
    ) 
}

export default UserWrapper
import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
import Auth from './Login/Auth';

function Main() {
    const {user} = useContext(UserContext);
  
    if(user.email === ""){
        return (<Auth/>)
    }

    return<></>
}

export default Main
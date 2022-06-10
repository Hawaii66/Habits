import React, { useContext, useEffect } from 'react'
import {Text} from "react-native";
import { NotiContext } from '../Contexts/NotificationContext';
import { INavType } from './Menu/Menu'
import NoteHome from './Menus/Notes/NoteMain';
import Pomodoro from './Menus/Pomodoro/Pomodoro';
import Timer from './Menus/Timer/Timer';
import TodoMain from './Menus/Todo/TodoMain'

interface Props{
    menu:INavType
}

function MenuSelector({menu}:Props) {
    const {notification} = useContext(NotiContext);

    console.log(menu);
    switch(menu)
    {
        case "Todo":
            return <TodoMain/>
        case "Pomodoro":
            return <Pomodoro/>
        case "Timer":
            return <Timer/>
        case "Note":
            return <NoteHome/>
    }

    return <Text>Error, Nothing Here</Text>
}

export default MenuSelector
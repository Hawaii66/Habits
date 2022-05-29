import React from 'react'
import {Text} from "react-native";
import { INavType } from './Menu/Menu'
import Pomodoro from './Menus/Pomodoro/Pomodoro';
import TodoMain from './Menus/Todo/TodoMain'

interface Props{
    menu:INavType
}

function MenuSelector({menu}:Props) {
    switch(menu)
    {
        case "Todo":
            return <TodoMain/>
        case "Pomodoro":
            return <Pomodoro/>
    }

    return <Text>Error, Nothing Here</Text>
}

export default MenuSelector
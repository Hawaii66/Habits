import React from 'react'
import {Text} from "react-native";
import { INavType } from './Menu/Menu'
import TodoMain from './Todo/TodoMain'

interface Props{
    menu:INavType
}

function MenuSelector({menu}:Props) {
    switch(menu)
    {
        case "Todo":
            return <TodoMain/>
    }

    return <Text>Error, Nothing Here</Text>
}

export default MenuSelector
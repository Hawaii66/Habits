import React from 'react'
import {Text} from "react-native";
import { INavType } from './Menu/Menu'
import FamilyVote from './Menus/Family/FamilyInfo/Vote/FamilyVote';
import FamilyManager from './Menus/Family/FamilyManager';
import FamilyWrapper from './Menus/Family/FamilyWrapper';
import NoteHome from './Menus/Notes/NoteMain';
import Pomodoro from './Menus/Pomodoro/Pomodoro';
import Timer from './Menus/Timer/Timer';
import TodoMain from './Menus/Todo/TodoMain'

interface Props{
    menu:INavType
}

function MenuSelector({menu}:Props) {

    switch(menu)
    {
        case "Person-Todo":
            return <TodoMain/>
        case "Person-Notes":
            return <NoteHome />
        
        case "FamilyInfo-Notification":
            return <FamilyWrapper menu={menu} />
        case "FamilyInfo-Vote":
            return <FamilyWrapper menu={menu} />
        case "Family-Manager":
            return <FamilyWrapper menu={menu} />
    }

    return <Text>Error, Nothing Here</Text>
}

export default MenuSelector
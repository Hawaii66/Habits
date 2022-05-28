import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MainButton from './MainButton';
import NavigationButton from './NavigationButton';

export type INavType = "List" | "None" | "Main" | "Person" | "Family" | "Calendar" | "Cross" | "Todo"|"Note" | "Notes" | "Cal" | "Times" |"Pomodoro"|"Timer"|"Shopping"

function TypeToNav(type:INavType):INavType[]
{
    switch(type)
    {
        case "List":
            return ["Todo","Note","None","None"];
        case "Calendar":
            return ["Cal","Times","None","None"];
        case "Person":
            return ["Pomodoro","Timer","None","None"];
        case "Family":
            return ["Shopping","Notes","None","None"];
    }

    return ["None","None","None","None"]
}

interface Props{
    setNav:(type:INavType)=>void
}

function Menu({setNav}:Props) {
    const menu:INavType[] = ["Family","Person","Calendar","List"];
    const [currMenu, setMenu] = useState<INavType>(menu[3]);
    const [showMain, setMain] = useState(false);

    return (
        <View style={styles.menu}>
            <NavigationButton onClick={()=>setNav(TypeToNav(currMenu)[0])} type={TypeToNav(currMenu)[0]}/>
            <NavigationButton onClick={()=>setNav(TypeToNav(currMenu)[1])} type={TypeToNav(currMenu)[1]}/>
            <MainButton setCurrMenu={setMenu} menu={menu} currMenu={currMenu} nav={TypeToNav} setMain={setMain} showMain={showMain}/>
            <NavigationButton onClick={()=>setNav(TypeToNav(currMenu)[2])} type={TypeToNav(currMenu)[2]}/>
            <NavigationButton onClick={()=>setNav(TypeToNav(currMenu)[3])} type={TypeToNav(currMenu)[3]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        display:"flex",
        flexDirection:"row",
        margin:0,
        width:"100%",
        justifyContent:"center",
        padding:2,
        backgroundColor:"#bdc3c7",
        borderWidth:0,
        borderTopWidth:2,
        borderColor:"#95a5a6"
    }
});


export default Menu
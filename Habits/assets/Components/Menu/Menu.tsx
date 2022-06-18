import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MainButton from './MainButton';
import NavigationButton from './NavigationButton';

export type INavType = "List" | "Notification" | "None" | "Main" | "Person" | "Calendar" | "Cross" | "Todo"|"Note" | "Notes" | "Cal" | "Times" |"Pomodoro"|"Timer"|"Shopping"|"Family-Manager"|
"FamilyInfo"|"FamilyInfo-Notification"|"FamilyInfo-Vote"|"Select"|"Select-Select"|"Select-Create"|"Select-Edit"|"Select-?"|"Family"|
"Family-Shopping"|"Family-Notes"|"Family-Food"|"Family-Chatt"|
"Person-Todo"|"Person-Notes"|"Person-Notification"

/*

- Person
    - Todo [] (Create todo lists to keep on top of everything)
    - Notes [] (Take simple notes that sync with the cloud)
    - Custom notifications (Send notifications to a special user)
    - Calculator with equations ?

- Family 
    - Shopping (Organised Todo lists with things to buy from different stores)
    - Notes (Create and edit in basic notes)
    - Chat (Chat with your family and keep up to date with everything)

- FamilyInfo
    - Notification (Send simple notifications to the whole family)
    - Vote (Vote on things with beautiful diagrams)
    - 

- Select Family
    - Select Family (Select the current family)
    - Create family (Create a new family and add members)
    - Edit family (Edit the current familys name and memembers)
    - 

*/
function TypeToNav(type:INavType):INavType[]
{
    switch(type)
    {
        /*case "List":
            return ["Todo","Note","None","None"];
        case "Calendar":
            return ["Cal","None","None","None"];
        case "Family":
            return ["Pomodoro","Timer","None","None"];
        case "None":
            return ["Shopping","Notes","Notification","Family-Manager"];*/

        case "FamilyInfo":
            return ["FamilyInfo-Notification", "FamilyInfo-Vote", "None", "Family-Manager"];
        case "Family":
            return ["Family-Chatt", "Family-Food", "Family-Notes", "None"];
        case "Person":
            return ["Person-Todo","Person-Notes","Person-Notification","None"];
        case "Select":
            return ["Select-Select","Select-Create","Select-Edit","None"];
    }

    return ["None","None","None","None"]
}

interface Props{
    setNav:(type:INavType)=>void
}

function Menu({setNav}:Props) {
    const menu:INavType[] = ["FamilyInfo","Family","Person","Select"];
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
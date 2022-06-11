import React, { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { NavigationContext } from '../Contexts/NavigationContext';
import { UserContext } from '../Contexts/UserContext'
import Auth from './Login/Auth';
import Menu, { INavType } from './Menu/Menu';
import MenuSelector from './MenuSelector';

function Main() {
    const {user} = useContext(UserContext);
    const [menu, setMenu] = useState<INavType>("Todo");

    if(user.email === ""){
        return (<Auth/>)
    }

    return (
        <NavigationContext.Provider value={{navigation:menu,setNavigation:(val)=>setMenu(val)}}>
            <View style={styles.main}>
                <MenuSelector menu={menu}/>
                <View style={styles.bottom}>
                    <Menu setNav={setMenu}/>
                </View>
            </View>
        </NavigationContext.Provider>
    )
}

const styles = StyleSheet.create({
    main:{
        display:"flex",
        width:"100%",
        height:"100%",
        borderColor:"black",
        borderWidth:1,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
    },
    bottom:{
        position:"absolute",
        bottom:0,
        minWidth:"100%"
    }
});

export default Main
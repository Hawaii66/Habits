import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import NavigationButton from './NavigationButton';

export type INavType = "Todo" | "None"

function Menu() {
    const [menu, setMenu] = useState<INavType[]>(["Todo","None","None","None"]);

    return (
        <View style={styles.main}>
            <View style={styles.menu}>
                <NavigationButton type={menu[0]}/>
                <NavigationButton type={menu[1]}/>
                <NavigationButton type={menu[2]}/>
                <NavigationButton type={menu[3]}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
      display:"flex",
      flexDirection:"row",
      margin:0,
      width:"100%"
    },
    main:{
        
        width:"100%",
        backgroundColor:"black",
    }
});


export default Menu
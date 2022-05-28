import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { UserContext } from '../Contexts/UserContext'
import Auth from './Login/Auth';
import Menu, { INavType } from './Menu/Menu';
import TodoMain from './Todo/TodoMain';

function Main() {
    const {user} = useContext(UserContext);
    const [menu, setMenu] = useState<INavType>("Todo");

    if(user.email === ""){
        return (<Auth/>)
    }

    return (
        <View style={styles.main}>
            <Text>{menu}</Text>
            <TodoMain/>
            <View style={styles.bottom}>
                <Menu setNav={setMenu}/>
            </View>
        </View>
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
        alignItems:"center"
    },
    bottom:{
        position:"absolute",
        bottom:0,
        minWidth:"100%"
    }
});

export default Main
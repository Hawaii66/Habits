import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native';
import { UserContext } from '../Contexts/UserContext'
import Auth from './Login/Auth';
import Menu from './Menu/Menu';
import TodoMain from './Todo/TodoMain';

function Main() {
    const {user} = useContext(UserContext);
  
    if(user.email === ""){
        return (<Auth/>)
    }

    return (
        <View style={styles.main}>
            <TodoMain/>
            <View style={styles.bottom}>
                <Menu/>
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
        bottom:0
    }
});

export default Main
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../Utils/Button'
import * as AppleAuthentication from 'expo-apple-authentication';
import None from './None';
import Login from './Login';
import Signup from './Signup';

type loginState = "none" | "login" | "signup"

function Auth() {
	const [menu, changeMenu] = useState<loginState>("none");

	const login = () => changeMenu("login");
	const signup = () => changeMenu("signup");
	const cancell = () => changeMenu("none");

	if(menu === "none"){return(<None login={login} signup={signup}/>)}
	if(menu === "login"){return(<Login cancell={cancell}/>)}
	if(menu === "signup"){return(<Signup cancell={cancell}/>)}

	return (<></>)
}

const styles = StyleSheet.create({
	container: {
        padding:3,
		alignItems:"center",
        display:"flex",
        flexDirection:"row",
	}
});

export default Auth
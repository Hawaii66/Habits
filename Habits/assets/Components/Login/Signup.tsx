import React, { useState } from 'react'
import { Text, View, Alert, TextInput, StyleSheet } from 'react-native'
import Button from '../Utils/Button'
import * as AppleAuthentication from 'expo-apple-authentication';
import Container from '../Utils/Container';
import { IUser } from '../../Interfaces/User';

interface Props{
	cancell: ()=>void
}

type SignupState = "apple" | "info"
type IInfo = {
	email:string,
	appleid:string,
	name:string
}

function Signup({cancell}:Props) {
	const [state,setState] = useState<SignupState>("apple");
	const [info,setInfo] = useState<IInfo>({appleid:"",email:"",name:""});
	const [username,setUsername] = useState("");
	const [name,setName] = useState("");

	const signUp = async () => {
		if(username === "" || name === ""){return;}
		if(info.email === "" || info.appleid === ""){return;}

		const user:IUser = {
			appleID:info.appleid,
			email:info.email,
			name:name,
			username:username
		}

		const result = await fetch(`http://176.10.157.225:5000/users/create`,{
			method:"POST",
			headers:{
				"Content-type":"application/json"
			},
			body:JSON.stringify(user)
		}).then(res=>res.json());

		console.log(result);
	}

	if(state === "apple"){
		return (
			<View>
				<Button text="Cancel Signup" onClick={cancell}/>
				<AppleAuthentication.AppleAuthenticationButton
					buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
					buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
					cornerRadius={5}
					style={{ width: 200, height: 44 }}
					onPress={async () => {
						try {
						const credential = await AppleAuthentication.signInAsync({
							requestedScopes: [
							AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
							AppleAuthentication.AppleAuthenticationScope.EMAIL,
							],
						});

						if(credential.email === null || credential.fullName === null || credential.fullName.givenName === null || credential.fullName.familyName)
						{
							Alert.alert("Login failed","You have probably already got a account, try login instead");
							cancell();
							return;
						}

						const nickname = credential.fullName.givenName + " " + credential.fullName.familyName;

						
						setInfo({
							appleid:credential.user,
							email:credential.email,
							name:nickname
						});
						setName(nickname)
						setState("info");
						} catch (e:any) {
							Alert.alert("Something went wrong","Try again in a few secconds");
							cancell();
						}
					}}
					/>
			</View>
		)
	}

	if(state === "info")
	{
		return(
			<>
				<Container>
					<Text>Email:</Text>
					<TextInput
						style={[styles.input,styles.disabled]}
						onChangeText={()=>{}}
						value={info.email}
						placeholder="Username"
						keyboardType="default"
						autoCapitalize='sentences'
						editable={false}
					/>
		  		</Container>
				<Container>
					<Text>Username:</Text>
					<TextInput
						style={styles.input}
						onChangeText={setUsername}
						value={username}
						placeholder="Username"
						keyboardType="default"
						autoCapitalize='sentences'
					/>
		  		</Container>
			  	<Container>
					<Text>Name:</Text>
					<TextInput
						style={styles.input}
						onChangeText={setName}
						value={name}
						placeholder="Name"
						keyboardType="default"
						autoCapitalize='words'
					/>
		  		</Container>
				<Button text="Sign Up" onClick={signUp}/>
			</>
		 )
	}

	return <></>
}

const styles = StyleSheet.create({
	input: {
	  height: 40,
	  margin: 12,
	  borderWidth: 1,
	  padding: 10,
	  minWidth:200,
	  maxWidth:200
	},
	disabled:{
		color:"#7f8c8d",
		backgroundColor:"#bdc3c7"
	}
});

export default Signup
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
    text?:string,
    onClick:()=>void,
	children?:React.ReactNode
}

function Button({text, onClick, children}:Props) {
	if(text !== undefined){
		return (
			<TouchableOpacity
				onPress={onClick}
				style={styles.button}
			>
				<Text style={styles.text}>{text}</Text>
			</TouchableOpacity>

		)
	}else{
		return (
			<TouchableOpacity
				onPress={onClick}
				style={styles.button}
			>
				{children}
			</TouchableOpacity>

		)
	}
}

const styles = StyleSheet.create({
	button: {
		margin:3,
		padding:10,
		backgroundColor:"#2c3e50",
		borderColor:"#34495e",
		borderWidth:3,
		borderRadius:3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text:{
		color:"#ecf0f1"
	}
  });

export default Button
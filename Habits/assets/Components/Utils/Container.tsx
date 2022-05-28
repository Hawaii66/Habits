import React from 'react'
import { StyleSheet, View } from 'react-native';

interface Props{
    children:React.ReactNode
}

function Container({children}:Props) {
  return (
    <View style={styles.container}>{children}</View>
  )
}

const styles = StyleSheet.create({
	container: {
        padding:3,
		alignItems:'center',
        display:"flex",
        flexDirection:"row",
	}
});


export default Container
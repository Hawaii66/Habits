import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import { INavType } from './Menu'
import NavigationButton from './NavigationButton'

interface Props{
    btnClicked:(nmb:number)=>void,
    animatedValueRef:React.MutableRefObject<Animated.Value>,
    type:INavType,
    offset:number
}

function MenuButton({btnClicked,animatedValueRef,type,offset}:Props) {
    return (
        <Animated.View style={[styles.button,{
                transform:[{translateY:animatedValueRef.current.interpolate({
                    inputRange:[0,1],
                    outputRange:[0, offset]
                })}]
            }]}>
            <NavigationButton onClick={()=>btnClicked(-120)} type={type}/>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    mainButton: {
        position:"relative",
        bottom:10,
    },
    button:{
        position:"absolute",
        bottom:10,
    },
    test:{
        position:"absolute",
        bottom:10
    }
});

export default MenuButton
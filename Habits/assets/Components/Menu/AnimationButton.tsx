import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import { INavType } from './Menu'
import NavigationButton from './NavigationButton'

interface Props{
    moveDownRef:React.MutableRefObject<Animated.Value>,
    moveStart:number,
    end:number,
    type:INavType
}

function AnimationButton({moveDownRef,moveStart,end,type}:Props) {
    return (
        <Animated.View style={[styles.test,{
                transform:[{translateY:moveDownRef.current.interpolate({
                    inputRange:[0,1],
                    outputRange:[moveStart, 20]
                })},{translateX:moveDownRef.current.interpolate({
                    inputRange:[0,1],
                    outputRange:[0, end]
                })}]
            }]}>
            <NavigationButton onClick={()=>{}} type={type}/>
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

export default AnimationButton
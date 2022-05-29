import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'
import AnimationButton from './AnimationButton';
import { INavType } from './Menu';
import MenuButton from './MenuButton';
import NavigationButton from './NavigationButton'

interface Props{
    setMain:(state:boolean)=>void,
    showMain:boolean,
    menu:INavType[],
    nav:(type:INavType)=>INavType[],
    currMenu:INavType,
    setCurrMenu:(type:INavType)=>void
}

const animEndOffsets = [-124,-62,124,62]

function MainButton({setMain,showMain,menu,currMenu,nav,setCurrMenu}:Props) {
    const [start, setStart] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [move, setMove] = useState(false);
    const [moveStart,setMoveStart] = useState(0);

    let rotateValueHolder = new Animated.Value(0);
    const animatedValueRef = useRef(rotateValueHolder);
    let moveDown = new Animated.Value(0);
    const moveDownRef = useRef(moveDown);

    const toggleShow = () => {
        rotateValueHolder.setValue(start);
        Animated.timing(animatedValueRef.current, {
          toValue: start === 1 ? 0 : 1,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(()=>{
            setStart(s => s === 1 ? 0 : 1);
            if(start === 1){setMain(false);}
            setAnimating(false);
        });
        setMain(true);
        setAnimating(true);
    };

    const btnClicked = (num:number,type:INavType) => {
        if(animating){return;}
        setCurrMenu(type);
        toggleShow();
        setMoveStart(num);
        moveDownToggle();
    }

    const moveDownToggle = () => {
        moveDownRef.current.setValue(0);
        Animated.timing(moveDownRef.current,{
            toValue:1,
            duration:200,
            easing:Easing.linear,
            useNativeDriver:false
        }).start(()=>{
            setMove(false);
        })
        setMove(true);
    }

    return (
        <View style={styles.mainButton}>
            {move && <>
                {nav(currMenu).map((item,index)=>{
                    return(
                        <AnimationButton key={index} end={animEndOffsets[index]} moveDownRef={moveDownRef} moveStart={moveStart} type={item} />
                    )
                })}
            </>}
            {(animating||showMain) && <>
                {menu.map((item,index,arr)=>{
                    var counter = -60;
                    arr.map((i, ind)=>{
                        if(ind < index && i !== currMenu){counter -= 60}
                    });
                    if(item !== currMenu){
                        return(<MenuButton key={index} animatedValueRef={animatedValueRef} btnClicked={(number)=>btnClicked(number,item)} offset={counter} type={item}/>)
                    }
                })}
            </>}
            <Animated.View style={{
                    transform:[{translateY:animatedValueRef.current.interpolate({
                        inputRange:[0,1],
                        outputRange:[0, 0]
                    })}]
                }}>
                <NavigationButton onClick={toggleShow} type={showMain ? "Cross" : "Main"}/>
            </Animated.View>
        </View>
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

export default MainButton
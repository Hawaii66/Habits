import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, Modal, ActionSheetIOS, Animated, Easing, AppState, AppStateStatus } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useInterval from '../../../Hooks/useInterval';
import Clock from './Clock'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotiContext } from '../../../Contexts/NotificationContext';
import * as Notifications from 'expo-notifications';

function Timer() {
    const [startMin, setStartMin] = useState(25);
    const [startSec, setStartSec] = useState(30);

    const [timer,_setTimer] = useState(0);
    const setTimer = (val:number)=>{
        _setTimer(val);
        timerRef.current = val;
    }
    const timerRef = useRef(timer);
    const [running,setRunning] = useState(false);
    const [edit, setEdit] = useState(false);

    const {sendNotification} = useContext(NotiContext);

    let rotateValueHolder = new Animated.Value(0);
    const animatedValueRef = useRef(rotateValueHolder);
    
    const appState = useRef(AppState.currentState);
    
    useEffect(() => {
        Animated.timing(animatedValueRef.current,{
            toValue:1,
            duration:1,
            easing:Easing.linear,
            useNativeDriver:false
        }).start();
        enterApp();

        getStoredStartValues();

        const subscription = AppState.addEventListener("change", appStateChanged);
        return () => {
          subscription.remove();
        };
    }, []);

    const getStoredStartValues = async() => {
        var min = await AsyncStorage.getItem("timer-startmin");
        if(min === null)
        {
            try{
                AsyncStorage.setItem("timer-startmin",10);
            }catch(e){console.log(e);}
            min = 25;
        }else{
            min = parseInt(min);
        }
        setStartMin(min);
        var sec = await AsyncStorage.getItem("timer-startsec");
        if(sec === null)
        {
            try{
                AsyncStorage.setItem("timer-startsec",30);
            }catch(e){console.log(e);}
            sec = 25;
        }else{
            sec = parseInt(sec);
        }
        setStartSec(sec);

        setTimer(min * 60 + sec);
    }

    const sendNoti = async() => {
        const timer = timerRef.current;
        const id = await sendNotification({
            title:"Time !",
            body:"Your timer has run out",
            code:"Timer",
            data:{}
        },timer);
        if(id !== undefined)
        {
            const previousID = await AsyncStorage.getItem("timer-prevnoti");
            Notifications.cancelScheduledNotificationAsync(previousID);
            await AsyncStorage.setItem("timer-prevnoti",id);
        }
    }

    const enterApp = async () => {
        try{
            const time = Date.now() / 1000;
            const previousDate = await AsyncStorage.getItem("timer-starttime") / 1000;
            const previous = await AsyncStorage.getItem("timer-time");
            const difference = Math.round(time - previousDate);
            
            const newTime = previous - difference;
            if(newTime <= 0)
            {
                switchOn(false);
                setTimer(0);
                return;
            }

            setTimer(previous - difference);
        }catch(e){console.log(e);}
    }

    const appStateChanged = (nextAppState: AppStateStatus) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            //Enter app
            enterApp();
        }else{
            //Exit app
            sendNoti();
        }
    
        appState.current = nextAppState;
    }

    useInterval(()=>{
        if(!running){return;}

        const time = timer - 1;
        if(time <= 0){switchOn(false);}
        setTimer(time);
    },1000);

    const switchOn = async (state:boolean) => {
        setRunning(state);

        Animated.timing(animatedValueRef.current,{
            toValue:state ? 0 : 1,
            duration:300,
            easing:Easing.linear,
            useNativeDriver:false
        }).start();

        if(state)
        {
            var time = timer;
            if(time === 0)
            {
                reset();
                time = startMin * 60 + startSec;
            }

            await AsyncStorage.setItem("timer-starttime",Date.now().toString());
            await AsyncStorage.setItem("timer-time",time.toString());
            sendNoti();
        }
    }

    const editMin = () => {
        onEdit(0,59,(val)=>{
            setStartMin(val);
            try{
                AsyncStorage.setItem("timer-startmin",val.toString())
            }catch(e){console.log(e);}
        });
    }

    const editSec = () => {
        onEdit(0,59,(val)=>{
            setStartSec(val);
            try{
                AsyncStorage.setItem("timer-startsec",val.toString())
            }catch(e){console.log(e);}
        });
    }

    const onEdit = (min:number,max:number,callback:(num:number)=>void) => {
        ActionSheetIOS.showActionSheetWithOptions(
        {
            options: GetValues(min,max)
        },
        buttonIndex => {
            callback(buttonIndex);
        });
    }

    const reset = () => {
        Notifications.cancelAllScheduledNotificationsAsync();
        setTimer(startMin * 60 + startSec);
    }

    useEffect(()=>{
        reset();
    },[startMin,startSec])

    const getMainBtnStatus = () => {
        if(running) return "PAUSE";
        if(timer === startMin * 60 + startSec) return "START";
        if(timer <= 0) return "RESTART";
        return "CONTINUE";
    }

    const getMainBtnColor = () => {
        if(running) return true;
        if(timer === startMin * 60 + startSec) return false;
        if(timer <= 0) return true;
        return false;
    }

    return (
        <View style={styles.main}>
            <Clock timer={timer}/>
            <TouchableOpacity style={[styles.button, getMainBtnColor() ? styles.error : styles.success]} onPress={()=>switchOn(!running)}><Text style={styles.btnText}>{getMainBtnStatus()}</Text></TouchableOpacity>
            <Animated.View style={{
                transform:[
                    {
                        translateY:animatedValueRef.current.interpolate({
                            inputRange:[0,1],
                            outputRange:[-85, 0]
                        })
                    },{
                        scale:animatedValueRef.current.interpolate({
                            inputRange:[0,0.5,1],
                            outputRange:[0,0,1]
                        })
                    }]
            }}>
                <View style={styles.editButtons}>
                    <TouchableOpacity style={[styles.button, styles.editBtn, styles.normal]} onPress={()=>setEdit(e=>!e)}><Text style={styles.btnText}>EDIT</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.editBtn, styles.normal]} onPress={()=>reset()}><Text style={styles.btnText}>RESET</Text></TouchableOpacity>
                </View>
            </Animated.View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={edit}
            onRequestClose={() => {
                setEdit(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.editClock}>
                        <TouchableOpacity onPress={()=>editMin()}><Text style={styles.modalText}>mm</Text></TouchableOpacity>
                        <Text style={styles.modalText}> : </Text>
                        <TouchableOpacity onPress={()=>editSec()}><Text style={styles.modalText}>ss</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={()=>setEdit(false)} style={styles.editDone}><Text style={styles.editDoneText}>Done</Text></TouchableOpacity>
                </View>
            </View>
        </Modal>
            
        </View>
    )
}

function GetValues(min:number,max:number)
{
    var arr = [];
    for(var i = 0; i < max - min + 1; i ++)
    {
        arr.push((i + min).toString());
    }
    return arr;
}

const styles = StyleSheet.create({
    main:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    button:{
        width:262,
        height:68,
        overflow:"hidden",
        borderRadius:20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    btnText:{
        fontSize:40,
        fontWeight:"700",
        textAlign:"center",
        color:"#fff"
    },
    success:{
        backgroundColor:"#27AE60"
    },
    error:{
        backgroundColor:"#E74C3C"
    },
    normal:{
        backgroundColor:"#2B303B"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        flex:1,
        width:"80%",
        maxHeight:"20%",
        margin: 20,
        backgroundColor: '#999',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding:15,
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
    },
    editClock:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
    },
    editDone:{
        marginBottom:15,
        backgroundColor:"#ffffff33",
        padding:15,
        paddingHorizontal:80,
        overflow:"hidden",
        borderRadius:15
    },
    editDoneText:{
        fontSize:24,
        fontWeight:"600"
    },
    modalText:{
        fontSize:36,
        fontWeight:"500"
    },
    editButtons:{
        marginTop:10,
    },
    editBtn:{
        marginTop:5
    }
});

export default Timer
import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Animated, Easing, Modal } from 'react-native'
import { NotiContext } from '../../../Contexts/NotificationContext'
import useInterval from '../../../Hooks/useInterval';
import EditTimers from './EditTimers';
import Progress, { IProgress } from './Progress';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';


export type EditButtons = "w"|"p"|"r"|"l"|"none";

function Pomodoro() {
    const [wTimer,setWTimer] = useState(25);
    const [pTimer,setPTimer] = useState(5);
    const [reps,setReps] = useState(3);
    const [long,setLong] = useState(30);

    const [timer,setTimer] = useState(59*60+59);
    const [repCounter,setRepCounter] = useState(0);
    const [progress,setProgress] = useState<IProgress[]>([]);
    const [track,setTrack] = useState(3);

    const {notification, sendNotification} = useContext(NotiContext);
    const [edit,setEdit] = useState(false);

    const [on,setOn] = useState(true);

    let rotateValueHolder = new Animated.Value(0);
    const animatedValueRef = useRef(rotateValueHolder);
    
    useInterval(()=>{
        if(on){setTimer(t=>t-1)}
    },1000);

    const recomputeProgress = () => {
        var count = 0;
        var pro:IProgress[] = [];
        for(var i = 0; i < reps; i +=1)
        {
            pro.push({
                state:count < track,
                t:"w",
                curr:count === track
            });
            count += 1
            pro.push({
                state:count < track,
                t:"p",
                curr:count === track
            });

            count += 1;
        }
        pro.pop();
        count -= 1;
        pro.push({
            state:count < track,
            t:"l",
            curr:count === track
        });
        setProgress([...pro]);
    }

    useEffect(()=>{
        recomputeProgress();
    },[wTimer,pTimer,reps,long])

    const switchOn = (state:boolean) => {
        setOn(!state)

        Animated.timing(animatedValueRef.current,{
            toValue:state ? 1 : 0,
            duration:300,
            easing:Easing.linear,
            useNativeDriver:false
        }).start();

        if(!state){setEdit(false);}
    }

    const setEditTimer = (type:EditButtons, num:number) => {
        switch(type)
        {
            case "w":
                setWTimer(num);
                break;
            case "p":
                setPTimer(num);
                break;
            case "r":
                setReps(num);
                break;
            case "l":
                setLong(num);
                break;
        }
    }

    const getTimeString = () => {
        const hour = timer / 60;
        const rhour = Math.floor(hour);
        const minute = (hour - rhour) * 60;
        const rminute = Math.round(minute);
        return `${rhour.toString().length === 1 ? "0" : ""}${rhour}:${rminute.toString().length === 1 ? "0" : ""}${rminute}`;
    }

    return (
        <View style={styles.main}>
            <View style={styles.shadow}>
                <View style={styles.timer}>
                    <Text style={styles.timertext}>{getTimeString()}</Text>
                </View>
            </View>
            <View style={styles.menu}>
                <View style={styles.shadow}>
                    <TouchableOpacity onPress={()=>switchOn(on)} style={[styles.mainBtn, on ? styles.on : styles.off]}><Text style={styles.btn}>{on ? "PAUSE" : "START"}</Text></TouchableOpacity>
                </View>
                <View style={[styles.test, !on ? styles.z : {}]}>
                    <Animated.View style={{
                            transform:[
                                {translateY:animatedValueRef.current.interpolate({
                                inputRange:[0,1],
                                outputRange:[-85, 0]
                            })},{scale:animatedValueRef.current.interpolate({
                                inputRange:[0,0.5,1],
                                outputRange:[0,0,1]
                            })}
                            ]
                        }}>
                        <View style={[styles.submenu, styles.shadow]}>
                            <View style={styles.shadow}><TouchableOpacity style={styles.subbtn} onPress={()=>{console.log("EDIT");setEdit(!edit)}}><Text style={styles.subbtntext}>EDIT TIMERS</Text></TouchableOpacity></View>
                            <View style={styles.shadow}><TouchableOpacity style={styles.subbtn}><Text style={styles.subbtntext}>RESET</Text></TouchableOpacity></View>
                        </View>
                    </Animated.View>
                </View>
                <View style={[styles.test, on ? styles.z : {}]}>
                    <Animated.View style={{
                            transform:[
                                {translateY:animatedValueRef.current.interpolate({
                                inputRange:[0,1],
                                outputRange:[0, -85]
                            })},{scale:animatedValueRef.current.interpolate({
                                inputRange:[0,0.5,1],
                                outputRange:[1,0,0]
                            })}
                            ]
                        }}>
                        <Progress progress={progress} point={track}/>
                    </Animated.View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={edit}
                    onRequestClose={() => {
                        setEdit(false);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <EditTimers setTimer={setEditTimer} lTimer={long} pTimer={pTimer} rTimer={reps} wTimer={wTimer}/>
                            <TouchableOpacity style={styles.close} onPress={()=>setEdit(false)}><Text style={styles.closetext}>CLOSE</Text></TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    test:{
        position:"absolute",
        top:80,
    },
    z:{
        zIndex:1
    },
    progress:{
        
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        flex:1,
        width:"70%",
        maxHeight:"40%",
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
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center"
    },
    close:{
        width:170,
        height:40,
        borderRadius:20, 
        backgroundColor:"#2B303B",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    closetext:{
        textAlign:"center",
        width:"100%",
        fontSize:24,
        fontWeight:'600',
        color:"#fff"
    },
    curr:{
        borderWidth:5,
        borderColor:"#E74C3C",
        borderRadius:5,
    },
    probtn:{
        width:40,
        height:40,
        marginTop:6
    },
    main:{
        flex:1,
        marginBottom:80,
        marginTop:30,
        minWidth:350,
        maxWidth:350,
        display:"flex",
        alignItems:"center",
    },
    menu:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    shadow:{
        shadowColor:"#000",
        shadowOpacity:0.25,
        shadowRadius:12
    },
    mainBtn:{
        width:262,
        height:68,
        backgroundColor:"#27AE60",
        borderRadius:20,
        overflow:"hidden",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    btn:{
        fontSize:40,
        fontWeight:'800',
        color:"#ffffff"
    },
    on:{
        backgroundColor:"#E74C3C"
    },
    off:{
        backgroundColor:"#27AE60"
    },
    submenu:{
        marginTop:10,
        width:250,
        height:175,
        backgroundColor:"#353B48",
        display:"flex",
        justifyContent:"space-evenly",
        alignItems:"center",
        overflow:"hidden",
        borderRadius:20,
        zIndex:1
    },
    subbtn:{
        width:200,
        height:60,
        backgroundColor:"#2B303B",
        display:"flex",
        justifyContent:"center",
        overflow:"hidden",
        borderRadius:15,
    },
    subbtntext:{
        color:"#ffffff",
        textAlign:"center",
        fontSize:23,
        fontWeight:"700"
    },
    timer:{
        width:338,
        height:168,
        backgroundColor:"#353B48",
        display:"flex",
        justifyContent:"center",
        overflow:"hidden",
        borderRadius:15,
        marginTop:60,
        marginBottom:40
    },
    timertext:{
        textAlign:"center",
        fontSize:96,
        fontWeight:"900"
    }
});

export default Pomodoro
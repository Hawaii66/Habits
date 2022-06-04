import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { EditButtons } from './Pomodoro'
import Svg, { Path } from 'react-native-svg';

export interface IProgress {
    t:EditButtons,
    state:boolean,
    curr:boolean
}

interface Props{
    progress:IProgress[],
    point:number
}

function Progress({progress,point}:Props) {
    const get6 = (pro:IProgress[], ind:number) => {
        var arr = [];
        for(var i = ind; i < ind + 6; i ++)
        {
            arr.push(pro[i]);
        }
        return arr;
    }

    return (
        <View style={styles.parent}>
            <View style={styles.boxparent}>
                {get6(progress,0).map((item,index)=>{
                    if(item === undefined){return<View key={index}></View>}
                    return(
                        <View key={index} style={[styles.box, item.t === "w" ? styles.work : item.t === "p" ? styles.pause : styles.long]}></View>
                    )
                })}
            </View>
            <View style={styles.boxparent}>
                {[...Array(6)].map((_,index)=>{
                    if(index === point){
                        return (
                            <TouchableOpacity key={index} style={styles.pointer}>
                                <Svg
                                    width="30"
                                    height="26"
                                    fill="none"
                                    viewBox="0 0 30 26"
                                    >
                                    <Path
                                        d="M11.5359 2C13.0755 -0.666663 16.9245 -0.666668 18.4641 2L28.8564 20C30.396 22.6667 28.4715 26 25.3923 26H4.6077C1.5285 26 -0.396008 22.6667 1.14359 20L11.5359 2Z"
                                        fill="#D9D9D9"
                                    />
                                </Svg>
                            </TouchableOpacity>
                        )
                    }
                    return <View key={index} style={styles.nopoint}/>
                })}
            </View>
            <View style={styles.boxparent}>
                {get6(progress,6).map((item,index)=>{
                    if(item === undefined){return<View key={index}></View>}
                    return(
                        <View key={index} style={[styles.box, item.t === "w" ? styles.work : item.t === "p" ? styles.pause : styles.long]}></View>
                    )
                })}
            </View>
            <View style={styles.boxparent}>
                {[...Array(6)].map((_,index)=>{
                    if(index + 6 === point){
                        return (
                            <TouchableOpacity key={index} style={styles.pointer}>
                                <Svg
                                    width="30"
                                    height="26"
                                    fill="none"
                                    viewBox="0 0 30 26"
                                    >
                                    <Path
                                        d="M11.5359 2C13.0755 -0.666663 16.9245 -0.666668 18.4641 2L28.8564 20C30.396 22.6667 28.4715 26 25.3923 26H4.6077C1.5285 26 -0.396008 22.6667 1.14359 20L11.5359 2Z"
                                        fill="#D9D9D9"
                                    />
                                </Svg>
                            </TouchableOpacity>
                        )
                    }
                    return <View key={index} style={styles.nopoint}/>
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    parent:{
        width:265,
        height:160,
        display:"flex",
        flexWrap:"wrap",
        flexDirection:"row",
        justifyContent:"space-between",
    },
    work:{
        backgroundColor:"#86EB75"
    },
    pause:{
        backgroundColor:"#E3F28A"
    },
    long:{
        backgroundColor:"#10A6C6"
    },
    nopoint:{
        width:40,
        height:40,
        marginRight:5
    },
    pointer:{
        width:40,
        height:40,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginRight:5
    },
    box:{
        width:40,
        height:40,
        backgroundColor:"red",
        marginRight:5
    },
    boxparent:{
        width:265,
        height:40,
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row",
    }
})

export default Progress
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native'
import { NotificationPreset } from './FamilyNotification';

interface Props
{
    show:boolean,
    setShow:(state:boolean) => void
    setSelected:(preset: NotificationPreset) => void,
    presets:NotificationPreset[],
    setCurr:(preset:NotificationPreset) => void,
    currPreset:NotificationPreset,
    deletePreset:(header:string) => void
}

function FamilyNotificationPresets({show, setShow, setSelected, presets, setCurr, currPreset, deletePreset}:Props)
{
    const [header,setHeader] = useState("");

    useEffect(() => {
        if(presets === null || presets === undefined || presets.length === 0){return;}

        setHeader(presets[0].header);
    },[presets])

    const onValueChanged = (number:number) => {
        const currentObj = presets[number];
        setHeader(currentObj.header);
        setCurr(currentObj);
    }

    return(
        <Modal
            animationType='fade'
            transparent={true}
            visible={show}>
            <View style={styles.center}>
                <View style={styles.shadow}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.span}></View>
                            <TouchableOpacity
                                style={styles.icon}
                                onPress={()=>setShow(false)}
                            >    
                                <FontAwesome name="close" size={48} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.members}>
                            <Picker
                                selectedValue={header}
                                onValueChange={(_,index) =>{
                                    onValueChanged(index)
                                }}>
                                {
                                presets.map((item) => {
                                    return(
                                        <Picker.Item key={item.header} color='#fff' label={item.header} value={item.header}>
                                            <Text>test</Text>
                                        </Picker.Item>
                                    )
                                })}
                            </Picker>
                        </View>
                        <View style={styles.bottom}>
                            <TouchableOpacity
                                style={styles.icon}
                                onPress={()=>{
                                    setShow(false);
                                    setSelected(currPreset);
                                }}
                            >    
                                <FontAwesome name="check" size={48} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.icon}
                                onPress={()=>{
                                    deletePreset(header)
                                }}
                            >    
                                <FontAwesome name="trash" size={28} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    center:{
        height:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    marginBottom:{
        height:"70%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    shadow:{
        shadowColor:"black",
        shadowOpacity:0.5,
        shadowRadius:10,
        elevation:2,
        shadowOffset:{
            height:0,
            width:0
        }
    },
    container:{
        width:303,
        height:297,
        backgroundColor: '#353B48',
        overflow:"hidden",
        borderRadius:36,
    },
    header:{
        width:277,
        marginHorizontal:15,
        height:60,
        textAlign:"center",
        display:"flex",
        flexDirection:"row",
    },
    bottom:{
        width:150,
        marginHorizontal:(303-(277-150))/2,
        height:60,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    span:{
        flexGrow:9
    },
    icon:{
        marginRight:0,
        flexGrow:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    members:{
        width:277,
        height:175,
        marginLeft:(303-277)/2
    }
});

export default FamilyNotificationPresets
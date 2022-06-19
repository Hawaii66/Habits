import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, Alert, Animated, Modal } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FamilyContext } from '../../../../Contexts/FamilyContext';
import { AntDesign, Entypo } from '@expo/vector-icons';
import FamilyNotificationBox from './FamilyNotificationBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import FamilyNotificationPresets from './FamilyNotificationPresets';
import { UserContext } from '../../../../Contexts/UserContext';
import { uploadData } from '../../../../Contexts/StaticContext';

interface Props
{

}

export interface NotificationPreset
{
    header:string,
    body:string
}

function FamilyNotification({}:Props)
{
    const [bodyText,setBody] = useState("");
    const [headerText, setHeaderText] = useState("");
    const [showPresets, setShowPresets] = useState(false);
    const [presets, setPresets] = useState<NotificationPreset[]>([]);
    const [currPreset, setCurr] = useState<NotificationPreset>({
        body:"",
        header:""
    });

    const {family} = useContext(FamilyContext);
    const {user} = useContext(UserContext);

    const saveAsPreset = async () => {
        var arr:NotificationPreset[] = await JSON.parse(await AsyncStorage.getItem("family-noti-saved"));
        if(arr !== null)
        {
            for(var i = 0; i < arr.length; i ++)
            {
                if(arr[i].header === headerText){return;}
            }
        }
        else
        {
            arr = [];
        }

        arr.push({
            body:bodyText,
            header:headerText
        });

        await AsyncStorage.setItem("family-noti-saved", await JSON.stringify(arr));
        fetchPresets();
    }

    const deletePreset = async (header:string) => {
        var arr:NotificationPreset[] = await JSON.parse(await AsyncStorage.getItem("family-noti-saved"));
        if(arr !== null)
        {
            for(var i = 0; i < arr.length; i ++)
            {
                if(arr[i].header === header)
                {
                    arr.splice(i, 1);
                    break;
                }
            }
        }
        else
        {
            arr = [];
        }

        await AsyncStorage.setItem("family-noti-saved", await JSON.stringify(arr));
        fetchPresets()
    }
 
    const setPreset = (preset:NotificationPreset) => {
        setBody(preset.body);
        setHeaderText(preset.header);
    }

    const fetchPresets = async () => {
        var arr:NotificationPreset[] = await JSON.parse(await AsyncStorage.getItem("family-noti-saved"));
        if(arr === null){arr = []}

        setPresets(arr);
        if(arr.length > 0)
        {
            setCurr(arr[0]);
        }else{
            setCurr({
                body:"",
                header:"No preset available"
            });
        }
    }

    const sendNotification = async () => {
        await uploadData(`/family/notification/send/${family.id}`,"POST",{
            header:headerText,
            body:bodyText
        });
    }

    useEffect(() => {
        fetchPresets();
    },[]);

    return(
        <View style={styles.optout}>
            <View style={styles.container}>
                <View style={styles.shadow}>
                    <View style={styles.notification}>
                        <View style={styles.presetWrapper}>
                            <Text style={styles.presetText}>Presets</Text>
                            <View style={styles.presets}>
                                <FamilyNotificationPresets
                                    setSelected={setPreset}
                                    show={showPresets}
                                    setShow={setShowPresets}
                                    currPreset={currPreset}
                                    presets={presets}
                                    setCurr={setCurr}
                                    deletePreset={deletePreset}
                                />
                                <View style={styles.presetCurrent}>
                                    <Text style={styles.presetCurrentText}>{currPreset.header}</Text>
                                </View>
                                {presets.length > 0 && <TouchableOpacity style={styles.presetOpen} onPress={()=>setShowPresets(true)}>
                                    <AntDesign name="caretdown" size={36} color="black" />
                                </TouchableOpacity>}
                            </View>
                        </View>

                        <View style={styles.boxes}>
                            <FamilyNotificationBox setText={(val)=>{setHeaderText(val)}} text={headerText} type="HEADER" />
                            <FamilyNotificationBox setText={(val)=>{setBody(val)}} text={bodyText} type="BODY" />
                        </View>

                        <View style={styles.bottom}>
                            <TouchableOpacity
                                    onPress={()=>sendNotification()}
                                    style={styles.sendBtnWrapper}
                                >
                                <Text style={styles.sendBtn}>Send</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveIcon}
                                onPress={()=>saveAsPreset()}
                            >
                                <Entypo name="save" size={48} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    optout:{
        flex:1,
        width:"100%"
    },
    container:{
        width:"100%",
        height:"70%",
    },
    notification:{
        marginTop:40,
        width:300,
        height:350,
        marginHorizontal:38,
        backgroundColor:"#353B48",
        overflow:"hidden",
        borderRadius:16
    },
    shadow:{
        shadowColor:"#000",
        elevation:2,
        shadowOffset:{
            height:0,
            width:0
        },
        shadowOpacity:0.5,
        shadowRadius:15
    },
    sendBtnWrapper:{
        width:190,
        height:55,
        overflow:"hidden",
        borderRadius:20,
        backgroundColor:"#27AE60",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    sendBtn:{
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:24,
        fontWeight:"900",
        color:"#fff"
    },
    bottom:{
        width:260,
        height:55,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        margin:15,
        alignItems:"center"
    },
    saveIcon:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    boxes:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:10,
    },
    presets:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        height:40,
        width:220,
        marginHorizontal:40,
    },
    presetOpen:{
        flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:40
    },
    presetCurrent:{
        flex:9,
        borderColor:"#000",
        borderWidth:3
    },
    presetCurrentText:{
        padding:3,
        color:"#fff"
    },
    presetText:{
        width:220,
        height:30,
        fontSize:24,
        fontWeight:"600",
        color:"#fff"
    },
    presetWrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:220,
        height:70,
        marginHorizontal:40,
        marginTop:8,
        marginBottom:5
    }
});

export default FamilyNotification
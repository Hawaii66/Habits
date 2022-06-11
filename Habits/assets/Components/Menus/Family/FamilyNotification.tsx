import React, { useContext } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FamilyContext } from '../../../Contexts/FamilyContext';
import { Entypo } from '@expo/vector-icons';

interface Props
{

}

function FamilyNotification({}:Props)
{
    const {family} = useContext(FamilyContext);
    console.log("TEST");
    return(
        <View style={styles.optout}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{family.name}</Text>
                </View>
                <View style={styles.shadow}>
                    <View style={styles.notification}>
                        <View style={styles.bottom}>
                            <TouchableOpacity
                                    onPress={()=>Alert.alert("Test")}
                                    style={styles.sendBtnWrapper}
                                >
                                <Text style={styles.sendBtn}>Send</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveIcon}
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
        marginTop:50,
        width:"100%",
        height:"70%",
    },
    header:{
        height:50,
        width:375,
    },
    headerText:{
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:36,
        fontWeight:"800",
        color:"#fff",
        textDecorationLine:"underline",
        textDecorationStyle:'double'
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
    }
});

export default FamilyNotification
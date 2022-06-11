import React, { useContext, useEffect, useRef, useState } from 'react'
import { Modal, StyleSheet, View, Text, Animated, Easing } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { uploadData } from '../../../Contexts/StaticContext';
import { FamilyContext } from '../../../Contexts/FamilyContext';
import { IFamily } from '../../../Interfaces/Family';
import { UserContext } from '../../../Contexts/UserContext';

interface Props
{
    show:boolean,
    setShow:(state:boolean) => void,
    family:IFamily,
    setFamily:(fam:IFamily) => void
}

function FamilySettings({show,setShow,family,setFamily}:Props)
{
    const [changinName,setChanging] = useState(false);
    const [newName, setName] = useState("");
    const [adding,setAdding] = useState(false);
    const [newUser,setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    let rotateValueHolder = new Animated.Value(0);
    const animatedValueRef = useRef(rotateValueHolder);

    const {user} = useContext(UserContext);
    
    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedValueRef.current,{
                toValue:1,
                useNativeDriver:false,
                delay:0,
                duration:1000,
                easing:Easing.linear,
            })
        ).start();
    },[])

    const addUser = async () => {
        setLoading(true);
        setAdding(false);

        const result = await uploadData(`/family/add/member/${family.id}`,"POST",{
            member:newUser
        });
        if(!result.success){return;}

        var fam:IFamily = {...family};
        fam.members.push(newUser);
        setFamily(fam);
        setLoading(false);
        setUsername("");
        setAdding(false);
    }

    const deleteUser = async (name:string) => {
        setLoading(true);

        const result = await uploadData(`/family/remove/member/${family.id}`,"POST",{
            member:name
        });
        if(!result.success){return;}

        var fam:IFamily = {...family};
        fam.members.splice(fam.members.indexOf(name), 1);
        setFamily(fam);
        setLoading(false);
        setUsername("");
        setAdding(false);
    }

    const changeName = async () => {
        setLoading(true);

        const result = await uploadData(`/family/change/name/${family.id}`,"POST",{
            name:newName
        });
        if(!result.success){return;}

        var fam:IFamily = {...family};
        fam.name = newName;
        setFamily(fam);
        setLoading(false);
        setChanging(false);
        setName("");
    }

    const userRenderer = (name:string) => {
        return (
            <View style={styles.member}>
                <View style={styles.text}>
                    <Text style={styles.username}>{name}</Text>
                </View>
                {name !== user.email && <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={()=>deleteUser(name)}
                >    
                    <FontAwesome5 name="trash" size={24} color="black" />
                </TouchableOpacity>}
            </View>
        )
    }

    if(loading)
    {
        return(
            <View style={adding ? styles.marginBottom : styles.center}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={show}>
                    <View style={adding ? styles.marginBottom : styles.center}>
                        <View style={styles.shadow}>
                            <View style={styles.container}>
                                <View style={styles.center}>
                                    <Animated.View style={{
                                        transform:[{
                                                rotate:animatedValueRef.current.interpolate({
                                                    inputRange:[0,1],
                                                    outputRange:["0deg","360deg"]
                                                })
                                            }]
                                    }}>
                                        <AntDesign name="loading1" size={58} color="black" />
                                    </Animated.View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    return(
        <View style={adding ? styles.marginBottom : styles.center}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={show}>
                <View style={adding ? styles.marginBottom : styles.center}>
                    <View style={styles.shadow}>
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <View style={styles.familyWrapper}>
                                    {changinName ? 
                                        <TextInput 
                                            style={styles.family} 
                                            autoFocus={true} 
                                            value={newName} 
                                            onChangeText={(val)=>setName(val)} 
                                            onEndEditing={()=>changeName()}
                                        /> : 
                                        <Text onPress={()=>setChanging(true)} style={styles.family}>{family.name}</Text>
                                    }
                                </View>
                                <TouchableOpacity
                                    style={styles.icon}
                                    onPress={()=>setShow(false)}
                                >    
                                    <FontAwesome name="close" size={48} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.members}>
                                <FlatList data={family.members} renderItem={({item})=>userRenderer(item)}/>
                                {adding ? 
                                <View style={styles.addUserBtn}>
                                    <TextInput 
                                        autoFocus={true}
                                        autoCapitalize={"none"}
                                        value={newUser}
                                        onChangeText={(val)=>setUsername(val)}
                                        style={styles.nameInput}
                                        maxLength={40}
                                        numberOfLines={1}
                                        onEndEditing={()=>addUser()}
                                    />
                                </View>
                                :
                                <TouchableOpacity
                                    style={styles.addUserBtn}
                                    onPress={()=>setAdding(s=>!s)}
                                >
                                    <Text style={styles.addUser}>ADD USER</Text>
                                </TouchableOpacity>}
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
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
    icon:{
        marginRight:0,
        flexGrow:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    familyWrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexGrow:9,
    },
    family:{
        fontSize:36,
        color:"#fff",
        fontWeight:"700"
    },
    members:{
        width:277,
        height:203,
        marginLeft:(303-277)/2
    },
    member:{
        width:277,
        height:50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    text:{
        flexGrow:9
    },
    username:{
        textAlign:"left",
        fontSize:16,
        color:"#fff"
    },
    closeBtn:{
        flexGrow:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    addUserBtn:{
        width:277,
        height:50,
        overflow:"hidden",
        borderRadius:18,
        backgroundColor:"#2B303B",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    addUser:{
        fontSize:24,
        color:"#fff",
        fontWeight:"900",
        textAlign:"center"
    },
    nameInput:{
        padding:7,
        fontSize:16,
        color:"#fff",
        fontWeight:"900",
        textAlign:"center"
    }
});

export default FamilySettings
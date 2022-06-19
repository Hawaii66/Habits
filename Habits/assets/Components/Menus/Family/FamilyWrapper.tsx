import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FamilyContext } from '../../../Contexts/FamilyContext';
import { getData } from '../../../Contexts/StaticContext';
import { UserContext } from '../../../Contexts/UserContext';
import { IFamily } from '../../../Interfaces/Family';
import { INavType } from '../../Menu/Menu';
import FamilyManager from './FamilyManager';
import FamilyNotification from './FamilyInfo/FamilyNotification';
import { NavigationContext } from '../../../Contexts/NavigationContext';
import FamilyVote from './FamilyInfo/Vote/FamilyVote';
import Notes from './Social/Notes/Notes';
import { SocketContext } from '../../../Contexts/SocketContext';

interface Props
{
    menu:INavType
}

function FamilyWrapper({menu}:Props)
{
    const [family,setFamily] = useState<IFamily>({
        id:"",
        members:[],
        name:"",
        notes:[],
        shopping:[],
        voteID:""
    });
    
    const {user} = useContext(UserContext);
    const {setNavigation} = useContext(NavigationContext);
    const {socket} = useContext(SocketContext);

    const fetchFamily = async () => {
        const result = await getData(`/family/get/member/${user.email}`);
        if(result.success)
        {
            const activeId = await AsyncStorage.getItem("family-active");
            if(activeId !== null)
            {
                result.data.forEach((family:IFamily) => {
                    if(family.id === activeId)
                    {
                        socket?.emit("Family-Join",{familyID:family.id});
                        setFamily(family);
                    }
                });
            }
            else
            {
                socket?.emit("Family-Join",{familyID:result.data[0].id});
                setFamily(result.data[0]);
            }
        }
    }

    useEffect(() => {
        fetchFamily();
    },[]);

    const changeActiveFamily = async (fam:IFamily) => {
        await AsyncStorage.setItem("family-active",fam.id);
        setFamily(fam);
    }

    const GetAcctualComponent = () => {
        switch(menu)
        {
            case "FamilyInfo-Notification":
                return <FamilyNotification />
            case "Family-Manager":
                return <FamilyManager />
            case "FamilyInfo-Vote":
                return <FamilyVote />
            case "Family-Notes":
                return <Notes />
        }
    }

    return (
        <FamilyContext.Provider value={{family:family,refreshFamily:()=>fetchFamily(),setFamily:(fam)=>changeActiveFamily(fam)}}>
            <View style={{height:"100%",}}>
                <View style={styles.header}>
                    <Text onPress={()=>{
                        setNavigation("Family-Manager");
                    }} style={styles.headerText}>{family.name}</Text>
                </View>
                {GetAcctualComponent()}
            </View>
        </FamilyContext.Provider>
    )
}

const styles = StyleSheet.create({
    header:{
        marginTop:50,
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
});

export default FamilyWrapper
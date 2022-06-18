import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { IFamily } from '../../../Interfaces/Family';

import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import FamilySettings from './FamilySettings';
import { FamilyContext } from '../../../Contexts/FamilyContext';
import { NavigationContext } from '../../../Contexts/NavigationContext';

interface Props
{
    family:IFamily,
    setFamily:(fam:IFamily)=>void,
    gold:boolean
}

const icons = [
    <Entypo name="shopping-basket" size={36} color="black" />, 
    <FontAwesome5 name="sticky-note" size={36} color="black" />,
    <Ionicons name="notifications-sharp" size={36} color="black" />
]

function FamilyPreview({family,setFamily,gold}:Props)
{
    const [showSettings, setSettings] = useState(false);

    const acctualFamily = useContext(FamilyContext);

    const {setNavigation} = useContext(NavigationContext);

    const iconClicked = (index:number) => {
        acctualFamily.setFamily(family);
        switch(index)
        {
            case 0:
                setNavigation("Family-Shopping");
                break;
            case 1:
                setNavigation("Family-Notes");
                break;
            case 2:
                setNavigation("FamilyInfo-Notification");
                break;
        }
    }

    return(
        <>
            <View style={[styles.main,gold && styles.gold]}>
                <View style={styles.header}>
                    <View style={styles.headerTextWrapper}>
                        <Text style={styles.headerText}>{family.name}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={()=>setSettings(s=>!s)}
                        style={styles.settings}
                    >
                        <MaterialIcons style={styles.cogwheel} name="settings" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.members}>
                    <Text style={styles.member}>Members:</Text>
                    <FlatList 
                        listKey={`Members:${family.id}`}
                        data={family.members}
                        keyExtractor={(_,index)=>index.toString()}
                        renderItem={({item}) => {
                            return(
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.member}>{item}</Text>
                            )
                        }}
                    />
                </View>
                <View style={styles.iconWrapper}>
                    {icons.map((item,index) => {
                        return(
                            <TouchableOpacity
                                style={styles.icon}
                                key={index}
                                onPress={()=>iconClicked(index)}
                            >
                                {item}
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
            <FamilySettings setFamily={setFamily} family={family} setShow={(s)=>setSettings(s)} show={showSettings}/>
        </>
    )
}

const styles = StyleSheet.create({
    main:{
        width:160,
        height:200,
        backgroundColor:"#353B48",
        margin:10,
        overflow:"hidden",
        borderRadius:15,
        display:"flex",
        alignItems:"center"
    },
    header:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        width:160,
        height:40,
        marginBottom:10
    },
    headerTextWrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    headerText:{
        margin:"auto",
        padding:"auto",
        textAlign:"center",
        width:115,
        fontSize:24,
        textAlignVertical:"center",
        color:"#fff",
        fontWeight:"700",
        textDecorationLine:'underline',
        textDecorationStyle:'double'
    },
    settings:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:30,
        height:40
    },
    cogwheel:{
        width:28,
        height:28,
    },
    members:{
        width:140,
        height:100,
    },
    member:{
        color:"#fff",
        fontWeight:"600",
    },
    iconWrapper:{
        width:160,
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"row",
    },
    icon:{
        width:36,
        height:36,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    gold:{
        borderColor:"gold",
        borderWidth:3
    }
});

export default FamilyPreview
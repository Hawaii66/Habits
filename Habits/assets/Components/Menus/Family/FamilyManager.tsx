import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { FamilyContext } from '../../../Contexts/FamilyContext';
import { getData, uploadData } from '../../../Contexts/StaticContext';
import { UserContext } from '../../../Contexts/UserContext';
import { IFamily } from '../../../Interfaces/Family';
import FamilyPreview from './FamilyPreview';

interface Props
{

}

function FamilyManager({}:Props)
{
    const [families, setFamilies] = useState<IFamily[]>([]);

    const {family} = useContext(FamilyContext);
    const {user} = useContext(UserContext);

    useEffect(() => {
        const fetchFamily = async () => {
            const result = await getData(`/family/get/member/${user.email}`);
            if(result.success)
            {
                setFamilies(result.data);
            }
        }

        fetchFamily();
    },[]);
    
    const changeFamilySettings = (id:string, newFamily:IFamily) => {
        var oldFamilies = [...families];
        for(var i = 0; i < oldFamilies.length; i ++)
        {
            if(oldFamilies[i].id === id)
            {
                oldFamilies[i] = newFamily;
            }
        }
        setFamilies(oldFamilies);
    }

    const newGroup = async () => {
        const result = await uploadData(`/family/create/${user.email}`,"POST",{});
        if(!result.success){return;}

        var oldFamilies = [...families,result.data];
        setFamilies(oldFamilies);
    }

    return(
        <View style={styles.container}>
            <View style={styles.families}>
                <FlatList keyExtractor={(_,index)=>index.toString()} numColumns={2} data={families} renderItem={(data) => {
                    return(
                        <FamilyPreview gold={data.item.id === family.id} setFamily={(newFam)=>changeFamilySettings(data.item.id,newFam)} family={data.item}/>
                    )
                }}/>
            </View>
            <View style={styles.newFamilyWrapper}>
                <TouchableOpacity
                    onPress={()=>newGroup()}
                    style={styles.newFamilyBtn}
                >
                    <Text style={styles.newFamily}>New Group</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"70%",
        display:"flex",
        justifyContent:"space-between"
    },
    families:{
        height:360,
        width:360,
        marginTop:40,
        marginLeft:5,
        display:"flex",
        flexDirection:"row",
    },
    newFamilyWrapper:{
        width:360,
        height:50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:0
    },
    newFamilyBtn:{
        width:280,
        height:50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#353B48",
        overflow:"hidden",
        borderRadius:15
    },
    newFamily:{
        fontSize:24,
        fontWeight:"700",
        color:"#fff",
        textAlign:"center"
    }
});

export default FamilyManager
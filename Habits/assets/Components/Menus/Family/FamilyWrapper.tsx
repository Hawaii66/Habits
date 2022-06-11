import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { FamilyContext } from '../../../Contexts/FamilyContext';
import { getData } from '../../../Contexts/StaticContext';
import { UserContext } from '../../../Contexts/UserContext';
import { IFamily } from '../../../Interfaces/Family';
import { INavType } from '../../Menu/Menu';
import FamilyManager from './FamilyManager';

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
        shopping:[]
    });
    
    const {user} = useContext(UserContext);

    useEffect(() => {
        const fetchFamily = async () => {
            const result = await getData(`/family/get/member/${user.email}`);
            if(result.success)
            {
                const activeId = await AsyncStorage.getItem("family-active");
                if(activeId !== null)
                {
                    for(var i = 0; i < result.data.length; i ++)
                    {
                        if(result.data[i].id === activeId)
                        {
                            setFamily(result.data[i]);
                        }
                    }
                }
                else
                {
                    setFamily(result.data[0]);
                }
            }
        }

        fetchFamily();
    },[]);

    const changeActiveFamily = async (fam:IFamily) => {
        await AsyncStorage.setItem("family-active",fam.id);
        setFamily(fam);
    }

    const GetAcctualComponent = () => {
        switch(menu)
        {
            case "Family-Manager":
                return <FamilyManager />
        }
    }

    return (
        <FamilyContext.Provider value={{family:family,setFamily:(fam)=>changeActiveFamily(fam)}}>
            {GetAcctualComponent()}
        </FamilyContext.Provider>
    )
}

const styles = StyleSheet.create({

});

export default FamilyWrapper
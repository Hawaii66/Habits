import React, { useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FamilyContext } from '../../../Contexts/FamilyContext';

interface Props
{

}

function FamilyNotification({}:Props)
{
    const {family} = useContext(FamilyContext);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{family.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"70%",
        backgroundColor:"red"
    },
    header:{

    },
    headerText:{
        
    }
});

export default FamilyNotification
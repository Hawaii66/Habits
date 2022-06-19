import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FamilyContext } from '../../../../../Contexts/FamilyContext';
import { SocketContext } from '../../../../../Contexts/SocketContext'

interface Props
{

}

function Notes({}:Props)
{
    const {socket} = useContext(SocketContext);
    const {family} = useContext(FamilyContext)
 
    const create = () => {
        socket?.emit("FamilySocial-Notes-Create",{familyID:family.id})
    }

    return(
        <View>
            <TouchableOpacity
                onPress={create}
            >
                <Text>Create</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default Notes
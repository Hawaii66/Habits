import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FamilyContext } from '../../../../../Contexts/FamilyContext';
import { SocketContext } from '../../../../../Contexts/SocketContext'
import { getData } from '../../../../../Contexts/StaticContext';
import { UserContext } from '../../../../../Contexts/UserContext';
import { INote } from '../../../../../Interfaces/Notes';

interface Props
{

}

function Notes({}:Props)
{
    const {socket} = useContext(SocketContext);
    const {family} = useContext(FamilyContext);
    const {user} = useContext(UserContext);

    const [notes,setNotes] = useState<INote[]>([]);
    const [note,setNote] = useState<INote|null>(null);

    const create = () => {
        socket?.emit("S-FamilySocial-Notes-Create1",{familyID:family.id})
    }

    useEffect(()=>{
        if(socket === null){return;}
        
        socket.on("C-FamilySocial-Notes-Create",data=>{
            setNotes(old=>[...old, data]);
        });
    },[]);

    const getAllNotes = async () => {
        const result = await getData(`/family/notes/get/${user.email}`);
        setNotes(result.data);
    }

    useEffect(()=>{
        getAllNotes();
    },[])

    return(
        <View>
            <TouchableOpacity
                onPress={create}
            >
                <Text>Create</Text>
            </TouchableOpacity>
            <View>
                {notes.map((item,index)=>{
                    return <Text key={index}>{item.header}</Text>
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default Notes
import React, { useContext, useState } from 'react'
import { Animated, FlatList, StyleSheet, View } from 'react-native'
import { FamilyContext } from '../../../../../Contexts/FamilyContext';
import { SocketContext } from '../../../../../Contexts/SocketContext';
import { uploadData } from '../../../../../Contexts/StaticContext';
import { UserContext } from '../../../../../Contexts/UserContext';
import { useShake } from '../../../../../Hooks/Animations/useShake';
import { INote } from '../../../../../Interfaces/Notes';
import NoteHomeEdit from '../../../Notes/NoteHomeEdit';
import NoteHomePreview from '../../../Notes/NoteHomePreview';

interface Props
{
    notes:INote[],
    setNotes:(notes:INote[])=>void,
    selectNote:(id:string)=>void
}

interface RenderData 
{
    note:INote,
    isNote:boolean,
    id:string
}

function NoteHome({notes, setNotes, selectNote}:Props)
{
    const {socket} = useContext(SocketContext);
    const {family} = useContext(FamilyContext);
    const {user} = useContext(UserContext);
    
    const [shouldDelete, setDelete] = useState(false);
    const [deleteScale,deleteRotation] = useShake(shouldDelete);

    const create = async () => {
        socket?.emit("S-FamilySocial-Notes-Create",{familyID:family.id})
    }

    const deleteNoteClicked = async (id:string) => {
        socket?.emit("S-FamilySocial-Notes-Delete",{
            familyID:family.id,
            email:user.email,
            noteID:id
        });
    }

    const reverse = () => {
        const old = [...notes];
        var newNotes = old.reverse();
        setNotes(newNotes);
    }

    const renderItem = ({item}:{item:RenderData}) => {
        if(item.isNote && item.note !== null){
            return <Animated.View style={{
                    transform:[
                        {
                            scale:deleteScale
                        },{
                            rotateZ:deleteRotation
                        }]
                }}>
                    <NoteHomePreview delPress={()=>deleteNoteClicked(item.id)} note={item.note} onSelect={()=>selectNote(item.note.id)} del={shouldDelete}/>
                </Animated.View>
        }

        return <NoteHomeEdit deleting={shouldDelete} del={()=>setDelete(s=>!s)} sort={()=>reverse()} create={create}/> 
    }

    const getArr = () => {
        var temp:RenderData[] = [];
        temp.push({note:{
            header:"",
            id:"",
            lastUpdated:0,
            owners:[],
            private:false,
            text:""
        },isNote:false,id:"EDITBUTTONS"});
        notes.forEach(i=>temp.push({note:i,isNote:true,id:i.id}))
        return temp;
    }

    return(
        <View style={styles.container}>
            <FlatList style={styles.grid} data={getArr()} renderItem={renderItem} numColumns={2} keyExtractor={item => item.id} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    grid:{
        width:360,
        marginTop:30,
        marginBottom:100,
    }
});

export default NoteHome
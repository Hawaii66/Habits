import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet,  FlatList, Animated, Easing } from 'react-native';
import { UserContext } from '../../../Contexts/UserContext';
import { useShake } from '../../../Hooks/Animations/useShake';
import { INote } from '../../../Interfaces/Notes';
import NoteHomeEdit from './NoteHomeEdit';
import NoteHomePreview from './NoteHomePreview';

interface Props
{
    setNote:(note:INote) => void;
}

interface RenderData 
{
    note:INote,
    isNote:boolean,
    id:string
}

function NoteHome({setNote}:Props) {
    const [notes, updateNotes] = useState<INote[]>([]);

    const {user} = useContext(UserContext);

    const [shouldDelete, setDelete] = useState(false);
    const [deleteScale,deleteRotation] = useShake(shouldDelete);

    const fetchNotes = async () => {
        const result = await fetch(`http://176.10.157.225:5000/notes/private/get/${user.email}`,{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        });
        if(result.status !== 200){return;}
        
        updateNotes(await result.json());
    }

    useEffect(() => {
        fetchNotes();
    },[])

    const create = async () => {
        const result = await fetch(`http://176.10.157.225:5000/notes/private/create/`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                email:user.email
            })
        });
        const note:INote = await result.json();
        setNote(note);
    }

    const deleteNoteClicked = async (id:string) => {
        await fetch(`http://176.10.157.225:5000/notes/private/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json"
            }
        });
        var tempNotes = [...notes];
        updateNotes(tempNotes.filter(i=>i.id !== id));
        setDelete(false);
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
                    <NoteHomePreview delPress={()=>deleteNoteClicked(item.id)} note={item.note} onSelect={()=>setNote(item.note)} del={shouldDelete}/>
                </Animated.View>
        }

        return <NoteHomeEdit deleting={shouldDelete} del={()=>setDelete(s=>!s)} sort={()=>updateNotes(ns=>[...ns.reverse()])} create={create}/> 
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

    return (
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
})

export default NoteHome
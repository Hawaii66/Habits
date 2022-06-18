import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { FamilyContext } from '../../../../../../Contexts/FamilyContext';
import { uploadData } from '../../../../../../Contexts/StaticContext';
import { IVote } from '../../../../../../Interfaces/Family';
import VoteCreateAdd from './VoteCreateAdd';
import VoteCreateItem from './VoteCreateItem';
import VoteCreateModal from './VoteCreateModal';

interface Props
{
    refresh:()=>void
}

function VoteCreate({refresh}:Props)
{
    const {family} = useContext(FamilyContext);

    const [vote,setVote] = useState<IVote>({
        alternatives:[{
            name:"Tacos",
            voters:[],
            votes:0
        }],
        familyID:family.id,
        id:"",
        name:"Vote",
        passes:0
    });
    const [editHeader,setHeaderEdit] = useState(false);
    const [headerText,setHeaderText] = useState(vote.name);

    const changeName = (index:number, name:string) => {
        var newVote = {...vote};
        newVote.alternatives[index].name = name.trimStart().trimEnd();
        setVote(newVote);
    }

    const deleteItem = (index:number) => {
        if(vote.alternatives.length < 3) return;
        var newVote = {...vote};
        newVote.alternatives.splice(index, 1);
        setVote(newVote);
    }

    const addItem = () => {
        var newVote = {...vote};
        newVote.alternatives = [...newVote.alternatives, {name:"Alternative",voters:[],votes:0}];
        setVote(newVote);
    }

    const changeHeader = (text:string) => {
        var newVote = {...vote};
        newVote.name = text;
        setVote(newVote);
    }

    const createVote = async () => {
        if(vote.name === "") return;
        if(vote.alternatives.length <= 1) return;
        if(vote.familyID === "") return;
        
        await uploadData(`/family/votes/create`,"POST",{
            ...vote
        });
        refresh();
    }

    return(
        <View style={styles.container}>
            <View style={styles.margin}>
                <View style={styles.header}>
                    {editHeader ? 
                        <TextInput 
                            value={headerText}
                            onChangeText={text=>setHeaderText(text)}
                            style={styles.voteName}
                            maxLength={15}
                            onEndEditing={()=>{
                                changeHeader(headerText);
                                setHeaderEdit(false);
                            }}
                            autoFocus
                        />
                        : <TouchableOpacity onPress={()=>setHeaderEdit(true)}><Text style={styles.voteName}>{vote.name}</Text></TouchableOpacity>
                    }
                </View>
                <View style={styles.main}>
                    <View style={styles.flatList}>
                        <FlatList
                            style={styles.flatList}
                            data={vote.alternatives}
                            renderItem={(info) => <VoteCreateItem 
                                alternative={info.item}
                                deleteAlternative={()=>deleteItem(info.index)}
                                setName={(name)=>changeName(info.index,name)}
                            />}
                        />
                    </View>
                    <VoteCreateAdd addItem={addItem}/>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.shadow}>
                        <TouchableOpacity
                            disabled={vote.alternatives.length <= 1}
                            style={styles.createBtn}
                            onPress={()=>createVote()}
                        >
                            <Text style={styles.createBtnText}>{vote.alternatives.length <= 1 ? "To few" : "Create"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:375,
        height:467,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    margin:{
        width:315,
        height:407
    },
    header:{
        width:315,
        height:50
    },
    voteName:{
        width:"100%",
        height:"100%",
        fontSize:48,
        color:"#fff",
        textAlign:"center",
        textDecorationLine:'underline',
        textDecorationStyle:'solid',
        fontWeight:"bold"
    },
    main:{
        width:315,
        height:297,
    },
    bottom:{
        width:315,
        height:60,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    shadow:{
        shadowColor:"#000",
        elevation:2,
        shadowOffset:{
            height:0,
            width:0
        },
        shadowOpacity:0.5,
        shadowRadius:15
    },
    createBtn:{
        width:195,
        height:60,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#535c68",
        borderRadius:15,
        overflow:"hidden"
    },
    createBtnText:{
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:36,
        fontWeight:"bold",
        color:"#fff"
    },
    flatList:{
        height:200,
        marginBottom:15,
        marginTop:5
    }
});

export default VoteCreate
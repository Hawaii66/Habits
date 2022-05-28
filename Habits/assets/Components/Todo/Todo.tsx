import Checkbox from 'expo-checkbox';
import React, { useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { ITodo } from '../../Interfaces/Todo';
import Container from '../Utils/Container';
import { EvilIcons } from '@expo/vector-icons'; 

interface Props{
    todo:ITodo,
    remove:boolean,
    checkmark: ()=>void,
    removeFunc:()=>void
}

function Todo({todo, remove, checkmark, removeFunc}:Props) {
    const [checked, setChecked] = useState(todo.done);

    return (
        <View style={styles.container}>
            <Container>
                <Checkbox
                    style={styles.checkbox}
                    value={checked}
                    onValueChange={()=>{setChecked(old=>!old);checkmark()}}
                    color={checked ? '#27ae60' : undefined}
                />
                <Text style={styles.text}>{todo.text}</Text>
                {remove &&<TouchableOpacity style={styles.remove} onPress={removeFunc}><EvilIcons name="trash" size={24} color="black" /></TouchableOpacity>}
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    checkbox: {
      margin: 8,
      minWidth:30,
      minHeight:30
    },
    container:{

    },
    text:{
        minWidth:160,
        fontSize:20
    },
    remove:{
        minHeight:20,
        backgroundColor:"#bdc3c7",
        margin:"auto",
        marginLeft:5,
        padding:5,
        borderRadius:8
    }
});

export default Todo
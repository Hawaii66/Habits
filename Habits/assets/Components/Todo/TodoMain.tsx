import React, { useContext, useEffect, useState } from 'react'
import {View, Text, Modal, Pressable, Alert, StyleSheet, TextInput, TouchableOpacity, Animated, Easing} from "react-native";
import { ITodo } from '../../Interfaces/Todo';
import Button from '../Utils/Button';
import Container from '../Utils/Container';
import Todo from './Todo';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { UserContext } from '../../Contexts/UserContext';

function TodoMain() {
    let rotateValueHolder = new Animated.Value(0);

    const [todos, setTodos] = useState<ITodo[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading,setLoading] = useState(false);

    const [newTodoText, setText] = useState("");

    const {user} = useContext(UserContext);

    useEffect(()=>{
        var mounted = true;
        startImageRotateFunction();
        getTodos().then(data=>{
            if(mounted){
                setTodos(data);
            }
        });
        return ()=>{mounted = false;}
    },[]);

    const getTodos = async () => {
        return fetch(`http://176.10.157.225:5000/todos/all/${user.email}`,{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        }).then(res=>res.json())
    }

    const startImageRotateFunction = () => {
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => startImageRotateFunction());
    };

    const addTodo = async () => {
        const info:ITodo = {
            done:false,
            email:user.email,
            id:"",
            text:newTodoText
        }
        setText("");
        setLoading(true);

        const todo:ITodo = await fetch("http://176.10.157.225:5000/todos/create",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(info)
        }).then(res=>res.json());

        setLoading(false);
        setModalVisible(false);
        setTodos(todos=>[...todos,todo]);
    }

    const toggleModal = (state:boolean) => {
        if(!state && !loading){
            setModalVisible(false);
        }
        if(state){
            setModalVisible(true);
        }
    }

    const fetchTodos = async () => {
        const data = await fetch(`http://176.10.157.225:5000/todos/all/${user.email}`,{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        }).then(res=>res.json())
        setTodos(data);
    }

    const changeState = async (id:string) => {
        var temp = [...todos];
        var index = 0;
        for(var i = 0; i < temp.length; i ++)
        {
            if(temp[i].id === id)
            {
                index = i;
                temp[i].done = !temp[i].done;
            }
        }

        await fetch(`http://176.10.157.225:5000/todos/update/${temp[index].id}`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({state:temp[index].done})
        });
        fetchTodos();
    }

    const removeTodo = async (id:string) => {
        await fetch(`http://176.10.157.225:5000/todos/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json"
            }
        });
        fetchTodos();
    }

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Todo:</Text>
                <View style={styles.right}>
                    <Button text={"Add Todo"} onClick={()=>toggleModal(true)}/>
                </View>
            </View>
            <View style={styles.divider}/>
            {todos.length > 0 ? <View>
                {todos.map((item,index) => {
                    if(!item.done){
                        return(<Todo removeFunc={()=>{}} checkmark={()=>changeState(item.id)} key={index} todo={item} remove={false}/>)
                    }
                })}
                {/*!showLine() && <View style={styles.divider}/>*/}
                {todos.map((item,index) => {
                    if(item.done){
                        return(<Todo removeFunc={()=>removeTodo(item.id)} checkmark={()=>changeState(item.id)} key={index} todo={item} remove={true}/>)
                    }
                })}
            </View> : <Text style={styles.notodo}>No todos!</Text>}

            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity disabled={loading} style={styles.cross} onPress={()=>toggleModal(false)}><Entypo name="cross" size={36} color="black" /></TouchableOpacity>
                            <Text style={styles.modalText}>New Todo</Text>
                            <Container>
                                <Text>Todo: </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setText}
                                    value={newTodoText}
                                    placeholder="Clean Kitchen"
                                    keyboardType="default"
                                    autoCapitalize='words'
                                />
                            </Container>
                            {loading ? <Animated.View style={{
                                transform:[{rotate:rotateValueHolder.interpolate({
                                    inputRange:[0,1],
                                    outputRange:["0deg","360deg"]
                                })}]
                            }}><AntDesign name="loading1" size={24} color="black" /></Animated.View> : <Button text="Add Todo" onClick={addTodo}/>}
                            
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        width:250
    },
    notodo:{
        fontSize:15,
        marginTop:45,
        textAlign:"center"
    },
    right:{
        marginRight:10
    },
    cross:{
        position:"absolute",
        top:0,
        right:0,
        margin:15
    },
    header:{
        margin:"auto",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    headerText:{
        fontSize:25
    },
    divider:{
        borderWidth:0,
        borderTopWidth:2,
        height:1,
        width:250
    },
	input: {
	  height: 40,
	  margin: 12,
	  borderWidth: 1,
      borderColor:"#55555555",
	  padding: 10,
	  minWidth:150,
	  maxWidth:150,
	},
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      fontSize:20,
      textDecorationLine:'underline',
      textAlign: 'center',
    },
  });

export default TodoMain
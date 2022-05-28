import { ITodo } from "../Interfaces/Todo";
import { IUser } from "../Interfaces/User";
import { todos, users } from "./Database";

type GetTodosType = (email:string) => Promise<ITodo[]>
type AddTodoType = (todo:ITodo) => Promise<ITodo>
type RemoveTodoType = (id:string) => Promise<void>
type ChangeTodoStatusType = (id:string, state:boolean) => Promise<void>

export const RemoveTodo:RemoveTodoType = async (id) => {
    await todos.findOneAndDelete({id:id});
}

export const ChangeTodoStatus:ChangeTodoStatusType = async (id, state) => {
    var todo:ITodo = await todos.findOne({id:id});
    todo.done = state;

    await todos.findOneAndUpdate({id:id},{$set:todo});
}

export const AddTodo:AddTodoType = async (todo) => {
    const id = GetRandomTodoID();

    const toInsert:ITodo = {
        done:false,
        email:todo.email,
        id:id,
        text:todo.text
    };

    const newTodo = await todos.insert(toInsert);
    return newTodo;
}

export const GetTodos:GetTodosType = async (email) => {
    const fetchedTodos:ITodo[] = await todos.find({email:email});
    return fetchedTodos;
}

function GetRandomTodoID(){
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":todo";
    return randomID;
}

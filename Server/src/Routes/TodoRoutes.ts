import {application, Express} from "express";
import { AddTodo, ChangeTodoStatus, GetTodos, RemoveTodo } from "../Database/Todo";

export const TodoRoutes = (app:Express) => {
    app.get("/todos/all/:email", async (req,res)=>{
        const email = req.params.email;

        const todos = await GetTodos(email);
        res.status(200).json(todos);
    });

    app.post("/todos/update/:id", async (req,res)=>{
        const id = req.params.id;
        const state = req.body.state;

        await ChangeTodoStatus(id, state);
        res.status(204).send("Changed status");
    });

    app.delete("/todos/delete/:id", async(req,res)=>{
        const id = req.params.id;
        
        await RemoveTodo(id);
        res.status(204).send("Deleted todo");
    });

    app.post("/todos/create", async (req,res)=>{
        const text = req.body.text;
        const email = req.body.email;

        const todo = await AddTodo({
            done:false,
            email:email,
            id:"",
            text:text
        });
        res.status(201).json(todo);
    });
}
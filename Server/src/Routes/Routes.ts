import {Express} from "express";

require("dotenv").config();

export const Routes = async (app:Express) => {
    app.get("/",(_,res)=>{
        res.status(200).json({message:"Server online and working!"})
    })
}
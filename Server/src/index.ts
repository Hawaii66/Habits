import express from "express";
import cors from "cors";
import {Routes} from "./Routes/Routes";

require("dotenv").config();

const PORT = process.env.PORT || 5555;

const app = express();

app.use(cors());
app.use(express.json());

Routes(app);

app.listen(PORT, ()=>{
    console.log(`Server listening on: https://localhost:${PORT}`)
})
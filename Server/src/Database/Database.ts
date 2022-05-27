import monk, {ICollection} from "monk";
require("dotenv").config();

if(process.env.MONGO_DB_URI === undefined)
{
    console.log("EXIT PROCESS STATUS 0, no MONGO_DB_URI found");
    process.exit();
}

export const db = monk(process.env.MONGO_DB_URI);

export const users:ICollection = db.get("users");
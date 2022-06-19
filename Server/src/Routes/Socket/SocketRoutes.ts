import {Socket} from "socket.io";
import { CreateNote, GetFamilyNote, GetFamilyNotes } from "../../Database/FamilyNotes";
import { GetFamilies, GetFamily } from "../../Database/Family";
import {Express} from "express";
import { DeleteNote } from "../../Database/Notes";
import { INote } from "../../Interfaces/Notes";

interface SocketClient{
    socket:Socket,
    email:string
}

const users:SocketClient[] = [];
const rooms:{ [ id:string ]:SocketClient[]} = {};
const openNotes:{[id:string]:INote} = {}

function GetDebug()
{
    var debug:{[id:string]:any} = {};
    var temp: string[] = [];
    users.forEach((u)=>temp.push(u.email));
    debug["users"] = temp;
    var temp2:{[id:string]:string[]} = {};
    for(var key in rooms) {
        var value = rooms[key];
        var temp3: string[] = [];
        value.forEach((u)=>temp3.push(u.email));
        temp2[key] = temp3;
    }
    debug["rooms"] = temp2;
    debug["notes"] = openNotes;
    return debug;
}

function GetSockets(roomID:string)
{
    var sockets:Socket[] = [];
    rooms[roomID].forEach((i)=>sockets.push(i.socket));
    return sockets;
}

function GetSocketUser(socket:Socket)
{
    for(var i = 0; i < users.length; i ++)
    {
        if(users[i].socket.id === socket.id)
        {
            return users[i];
        }
    }

    return null;
}

function EmitToFamily(familyID:string,id:string,message:any)
{
    GetSockets(familyID).forEach((s)=>s.emit(id,message));
}

function EmitToFamilyExceptSocket(familyID:string,id:string,message:any,socket:Socket)
{
    rooms[familyID].forEach(u=>{
        if(u.socket.id !== socket.id){u.socket.emit(id,message)}
    });
}

export const SocketRoutes = (io:any, app:Express) => {
    app.get("/test",(req,res)=>{
        res.json(GetDebug());
    });

    io.on("connection",(socket:Socket)=>{
        socket.on("init", async (data:any)=>{
            const email = data.email;
            users.push({
                email:email,
                socket:socket
            });

            const families = await GetFamilies(email);
            families.forEach(fam=>socket.join(fam.id));
        });

        socket.on("Family-Join", async(data:any)=>{
            const familyID = data.familyID;
            const family = await GetFamily(familyID);
            if(family === null){return;}

            rooms[family.id] = users.filter((user)=>family.members.includes(user.email));
        });

        socket.on("S-FamilySocial-Notes-Create",async(data:any)=>{
            const family = await GetFamily(data.familyID);
            if(family === null){return;}

            const note = await CreateNote({  
                header:"Title",
                id:"",
                lastUpdated:Date.now(),
                owners:family.members,
                private:false,
                text:"Click me to edit the text",
            });

            GetSockets(family.id).forEach((s)=>s.emit("C-FamilySocial-Notes-Create",note));
        });

        socket.on("S-FamilySocial-Notes-Delete",async(data:any)=>{
            const family = await GetFamily(data.familyID);
            if(family === null){return;}
        
            const noteID = data.noteID;
            await DeleteNote(noteID);

            const notes = await GetFamilyNotes(data.email);
            GetSockets(family.id).forEach(s=>s.emit("C-FamilySocial-Notes-Delete",notes));
        });

        socket.on("S-FamilySocial-Notes-Open", async(data:any)=>{
            const noteID = data.noteID;

            if(openNotes[noteID] === undefined)
            {
                openNotes[noteID] = await GetFamilyNote(noteID);
            }
            console.log(openNotes[noteID]);

            socket.emit("C-FamilySocial-Notes-Open", openNotes[noteID]);
        });

        socket.on("S-FamilySocial-Notes-Header", async(data:any)=>{
            const family = await GetFamily(data.familyID);
            if(family === null){return;}

            const noteID = data.noteID;
            var note = openNotes[noteID];
            note.header = data.header;

            EmitToFamilyExceptSocket(family.id,"C-FamilySocial-Notes-Header",note,socket);
        });

        socket.on("S-FamilySocial-Notes-Text", async(data:any)=>{
            const family = await GetFamily(data.familyID);
            if(family === null){return;}

            const noteID = data.noteID;
            var note = openNotes[noteID];
            note.text = data.text;

            EmitToFamilyExceptSocket(family.id,"C-FamilySocial-Notes-Text",note,socket);
        })

        socket.on("disconnect",()=>{
            const user = GetSocketUser(socket);
            if(user === null){return;}

            for(var key in rooms) {
                var value = rooms[key];
                for(var i = 0; i < value.length; i ++)
                {
                    if(value[i].email === user.email)
                    {
                        value.splice(i, 1);
                        break;
                    }
                }
            }
            for(var i = 0; i < users.length; i ++)
            {
                if(users[i].email === user.email)
                {
                    users.splice(i, 1);
                    break;
                }
            }
        });
    });
}
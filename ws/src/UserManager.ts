import { WebSocket } from "ws"
import { OutgoingMessages } from "./types";
import { User } from "./Users";





let ID = 1;


export class UserManager{
    private _users: User[] = [];
    private static _instance : UserManager; // again the singleton pattern (By GPT)

    private constructor(){
        this._users = [];  // THis is the suggestion from the gpt
    }


    public static getInstance () {
        if(!this._instance){
            this._instance = new UserManager();
        }
        return this._instance;
    }

    addUser (ws: WebSocket, name: string){
        let id = ID;
        this._users.push(new User(
            id,
            name,
            ws,
        ))


        ws.on("close",() =>  this.removeUser(id))
        ID++;
    }


    /* Below is a suggestion by the gpt for the reassignment of the new array
    to the original value. Harkirat was not doing the reupdation.*/

    removeUser (id:number){
        this._users = this._users.filter(x => x.id !== id);
    }

    /*Broadcast message to everyonw who has joine */


    broadCast( message:OutgoingMessages, userId:number){
        this._users.forEach(({id,ws}) => {
            if(userId!== id){
                ws.send(JSON.stringify(message));
            }
        })
    }
}  
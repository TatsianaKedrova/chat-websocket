import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {v1} from "uuid";

type UserType = {
    userId: number
    userName: string
    photo: string
    message: string
}

function App() {

    const [text, setText] = useState<string>("");
    const [users, setUsers] = useState<UserType[]>([]);
    const [ws, setWS] = useState<WebSocket | null>(null)

    useEffect( () => {
        console.log("USE EFFECT");
        let localWS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
        localWS.onmessage = (messageEvent) => {
            console.log(messageEvent);
            let messages = JSON.parse(messageEvent.data);
            console.log(messages);
            setUsers(messages);
        }
        setWS(localWS);
    }, [])
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value)
    };
    const sendMessage = () => {
        ws?.send(text)
        setText("");
    }

    return (
        <div className="App">
            <div className={"chat"} style={{display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
                <div className={"messages"}>
                    {users.map(user => {
                        return <div key={v1()} className={"message"} style={{marginBottom: "30px"}}>
                              <img src={user.userId === 17167 ? "https://i.pinimg.com/736x/45/bf/58/45bf5819509ef80a9bf013f0512670db.jpg" : user.photo} alt={"avatar photo"}
                                     style={{borderRadius: "50%", height: "70px", width: "70px"}}/>
                                <strong>{user.userName}</strong>
                                <span>{user.message}</span>
                            </div>
                        }
                    )}
                </div>
                <div className={"footer"} style={{marginTop: "30px"}}>
                    <textarea value={text} onChange={onChange}></textarea>
                    <button style={{position: "absolute", marginLeft: "20px"}} onClick={() => sendMessage()}>Send</button>
                </div>
            </div>

        </div>
    );
}
export default App;

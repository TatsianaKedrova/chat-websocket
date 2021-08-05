import React, {ChangeEvent, useEffect, useState, KeyboardEvent, useRef} from 'react';
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
    const [ws, setWS] = useState<WebSocket | null>(null);

    if(ws) {
        ws.onmessage = (messageEvent) => {
        let messages = JSON.parse(messageEvent.data);
        setUsers([...users, ...messages])
            window.scrollTo(0,document.body.scrollHeight)
    }}

    useEffect( () => {
        console.log("USE EFFECT renders");
        let localWS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
        setWS(localWS);
    }, [])
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value)
    };
    const sendMessage = () => {
        ws?.send(text);
        setText("");
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === "Enter" && text.trim().length) {
            sendMessage();
            setText("")
            textareaRef.current?.blur()
            // textareaRef?.current?.blur()
        }
    }

    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
                    <textarea ref={textareaRef} value={text} onChange={onChange} onKeyUp={onKeyPressHandler}>{text}</textarea>
                    <button style={{position: "absolute", marginLeft: "20px"}} onClick={() => sendMessage()}>Send</button>
                </div>
            </div>

        </div>
    );
}
export default App;

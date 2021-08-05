import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';

type UserType = {
    id: number
    name: string
    photo: string
    message: string
}

function App() {

    const [text, setText] = useState("");
    const [users, setUsers] = useState<UserType[]>([]);
    const [ws, setWS] = useState<WebSocket | null>(null)

    useEffect( () => {
        console.log("USE EFFECT");
        let localWS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
        localWS.onmessage = (messageEvent) => {
            debugger;
            console.log(messageEvent);
        }
        setWS(localWS);
    }, [])
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value)
    };
    const sendMessage = () => {
        ws?.send(text)
        setText("");

        // setText("")
    }

    return (
        <div className="App">
            <div className={"chat"} style={{display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
                <div className={"messages"}>
                    {users.map(user => {
                        return <div key={user.id} className={"message"} style={{marginBottom: "30px"}}>
                                <img src={user.photo} alt={"avatar photo"}
                                     style={{borderRadius: "50%", height: "70px", width: "70px"}}/>
                                <strong>{user.name}</strong>
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

/*
{
    id: 1,
        name: "Bridgit",
    photo: "https://i.pinimg.com/736x/45/bf/58/45bf5819509ef80a9bf013f0512670db.jpg",
    message: "She is fantastic woman"
}, {
    id: 2,
        name: "Michel",
        photo: "https://uhd.name/uploads/posts/2020-06/1593192847_24-p-mishel-merse-hot-28.jpg",
        message: "She is french actress with wonderful appearence"
}*/

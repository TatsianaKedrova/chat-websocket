import React, {ChangeEvent, useState} from 'react';
import './App.css';

function App() {

    const [text, setText] = useState("");
    const [users, setUsers] = useState([{id: 1, name: "Bridgit", photo: "https://i.pinimg.com/736x/45/bf/58/45bf5819509ef80a9bf013f0512670db.jpg", message: "She is fantastic woman"}, {id: 2, name: "Michel", photo: "https://uhd.name/uploads/posts/2020-06/1593192847_24-p-mishel-merse-hot-28.jpg", message: "She is french actress with wonderful appearence"}]);

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value)
    }
    const sendMessage =(message: string) => {
        alert(text);

        setText("")
    }

    return (
        <div className="App">
            <div className={"chat"}>
                <div className={"messages"}>
                    <div className={"message"}>
                        <img src={users[0].photo} alt={"avatar photo"}
                             style={{borderRadius: "50%", height: "70px", width: "70px"}}/>
                        <strong>{users[0].name}</strong>
                        <span>{users[0].message}</span>
                    </div>
                    <div className={"message"}>
                        <img src={users[1].photo} alt={"avatar photo"}
                             style={{borderRadius: "50%", height: "70px", width: "70px"}}/>
                        <strong>{users[1].name}</strong>
                        <span>{users[1].message}</span>
                    </div>
                </div>
                <div className={"footer"}>
                    <textarea value={text} onChange={onChange}></textarea>
                    <button onClick={() => sendMessage(text)}>Send</button>
                </div>
            </div>

        </div>
    );
}

export default App;

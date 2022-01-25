import './App.css';
import io from 'socket.io-client'
import React, { useState } from 'react'
import Chat from './Chat';
const socket = io.connect('https://chat-server-fb.herokuapp.com/');


function App() {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [showChat, setShowChat] = useState(false)
    const joinRoom = () => {
        if (username !== '' && room !== "") {
            socket.emit('join_room', room)
            setShowChat(true)

        }
    }
    return (
        <div className="App" >
            {!showChat ? (<div className='joinChatContainer'>
                <h3>Join a chat</h3>
                <input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder='Jhon....'></input>
                <input type="text" placeholder='Room ID....' onChange={(e) => { setRoom(e.target.value) }}></input>
                <button onClick={joinRoom}>Join a Room</button>
            </div>)
                : (<Chat socket={socket} username={username} room={room}></Chat>)}



        </div>
    );
}

export default App;
import React, { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
function Chat({ socket, username, room }) {
    const [currentMessage, setcurrentMessage] = useState('')
    const [messageList, setmessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
            };
            await socket.emit('send_message', messageData)
            setmessageList((list) => [...list, messageData])

            console.log("message info", currentMessage);

        };

    }
    useEffect(() => {
        socket.on('receive_message', (data) => {
            setmessageList((list) => [...list, data])
            console.log(data);
        })
    }, [socket])
    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                {messageList.map((messageContent)=>{
              return (
                <div className='message' id={username === messageContent.author?'other':'you'}>
                    <div>
                        <div className='message-content'>
                            <p>{messageContent.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p id='time'>{messageContent.time}</p>
                            <p id='author'>{messageContent.author}</p>
                        </div>
                    </div>
                </div>
                )
                })}
                </ScrollToBottom>

            </div>
            <div className='chat-footer'>
                <input onChange={(e) => { setcurrentMessage(e.target.value) }} 
                onKeyPress={(e)=>{
                    e.key === 'Enter' && sendMessage()
                }}
                type='text' placeholder='hey...'></input>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat

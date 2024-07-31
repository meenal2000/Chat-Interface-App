import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

const ENDPOINT = "http://127.0.0.1:4000";
const socket = socketIOClient(ENDPOINT);

function App() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [username, setUsername] = useState(null);
    const [isPrompted, setIsPrompted] = useState(false);
    const [file, setFile] = useState(null); // State for file uploads

    useEffect(() => {
        if (!isPrompted) {
            const user = prompt("Enter your username:");
            if (user) {
                setUsername(user);
                setIsPrompted(true);
                socket.emit('join', user);
            } else {
                alert('Username is required.');
            }
        }

        const handleReceiveMessage = (message) => {
            console.log('Message received:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        const handleTyping = () => {
            console.log('Typing...');
            setIsTyping(true);
        };

        const handleStopTyping = () => {
            console.log('Stopped typing');
            setIsTyping(false);
        };

        socket.on('receiveMessage', handleReceiveMessage);
        socket.on('typing', handleTyping);
        socket.on('stopTyping', handleStopTyping);

        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
            socket.off('typing', handleTyping);
            socket.off('stopTyping', handleStopTyping);
        };
    }, [isPrompted]);

    const sendMessage = () => {
        if (username) {
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const newMessage = {
                        content: reader.result,
                        type: file.type.includes('image') ? 'image' :
                            file.type.includes('video') ? 'video' :
                            file.type.includes('pdf') || file.type.includes('doc') ? 'document' : 'link',
                        user: username,
                        timestamp: new Date().toLocaleTimeString(),
                    };
                    socket.emit('sendMessage', newMessage);
                    setFile(null); // Clear file after sending
                };
                reader.readAsDataURL(file);
            } else if (message.trim() !== "") {
                const newMessage = {
                    content: message,
                    type: 'text',
                    user: username,
                    timestamp: new Date().toLocaleTimeString(),
                };
                socket.emit('sendMessage', newMessage);
                setMessage("");
            }
        }
    };

    const handleTyping = () => {
        if (username) {
            socket.emit('typing');
            setTimeout(() => socket.emit('stopTyping'), 3000);
        }
    };

    const renderMessage = (msg) => {
        switch (msg.type) {
            case 'image':
                return <img src={msg.content} alt="Message content" className="preview-image" />;
            case 'video':
                return (
                    <video controls className="preview-video">
                        <source src={msg.content} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            case 'document':
                return (
                    <a href={msg.content} target="_blank" rel="noopener noreferrer" className="preview-document">
                        View Document
                    </a>
                );
            case 'link':
                return (
                    <a href={msg.content} target="_blank" rel="noopener noreferrer" className="preview-link">
                        {msg.content}
                    </a>
                );
            case 'text':
            default:
                return <p>{msg.content}</p>;
        }
    };

    return (
        <div className="App">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.user === username ? 'user-message' : 'received-message'}`}>
                        <div className="message-header">
                            <span className="username">{msg.user}</span>
                            <span className="timestamp">{msg.timestamp}</span>
                        </div>
                        <div className="message-content">
                            {renderMessage(msg)}
                        </div>
                    </div>
                ))}
                {isTyping && <div className="typing-indicator">User is typing...</div>}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        handleTyping();
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') sendMessage();
                    }}
                    placeholder="Type your message here..."
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ marginLeft: '10px' }}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default App;

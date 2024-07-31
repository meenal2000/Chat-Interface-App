import React from 'react';

function MessageInput({ message, setMessage, sendMessage, handleTyping }) {
    return (
        <div className="message-input">
            <input
                type="text"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                    handleTyping();
                }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default MessageInput;

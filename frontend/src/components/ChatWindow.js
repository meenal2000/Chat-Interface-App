import React from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

function ChatWindow({ messages, isTyping, renderMessage }) {
    return (
        <div className="chat-window">
            {messages.map((msg, index) => (
                <Message key={index} message={msg} renderMessage={renderMessage} />
            ))}
            <TypingIndicator isTyping={isTyping} />
        </div>
    );
}

export default ChatWindow;

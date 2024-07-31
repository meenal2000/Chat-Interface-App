import React from 'react';

function TypingIndicator({ isTyping }) {
    return isTyping ? <div className="typing-indicator">User is typing...</div> : null;
}

export default TypingIndicator;

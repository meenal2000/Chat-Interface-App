import React from 'react';

function Message({ message, renderMessage }) {
    return (
        <div className="message">
            {renderMessage(message)}
        </div>
    );
}

export default Message;

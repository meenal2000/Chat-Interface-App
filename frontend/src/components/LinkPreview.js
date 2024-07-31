import React from 'react';

function LinkPreview({ linkUrl, title, description, imageUrl }) {
    return (
        <div className="link-preview">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl} alt={title} />
                <div className="link-info">
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>
            </a>
        </div>
    );
}

export default LinkPreview;

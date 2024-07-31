import React from 'react';

function DocumentPreview({ docUrl, docName }) {
    return (
        <div className="document-preview">
            <a href={docUrl} target="_blank" rel="noopener noreferrer">
                <i className="document-icon" /> {docName}
            </a>
        </div>
    );
}

export default DocumentPreview;

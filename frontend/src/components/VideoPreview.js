import React from 'react';

function VideoPreview({ videoUrl }) {
    return (
        <div className="video-preview">
            <video controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default VideoPreview;

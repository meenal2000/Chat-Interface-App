import React from 'react';

function ProductPreview({ imageUrl, title }) {
    return (
        <div className="product-preview">
            <img src={imageUrl} alt={title} />
            <p>{title}</p>
        </div>
    );
}

export default ProductPreview;

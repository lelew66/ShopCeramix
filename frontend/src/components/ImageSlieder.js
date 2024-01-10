import React, { useState } from "react";

const ImageSlider = (props) => {
    const [currentImage, setCurrentImage] = useState(0);
  
    const handleThumbnailClick = (index) => {
      setCurrentImage(index);
    };
  
    return (
      <div className="image-slider">
        <div className="thumbnail-container">
          {props.imgURLs.map((image, index) => (
            <div className="img-box">
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleThumbnailClick(index)}
              className={index === currentImage ? "active-thumbnail" : ""}
            />
            </div>
          ))}
        </div>
        <div className="main-image">
          <img src={props.imgURLs[currentImage]} alt={`Slide ${currentImage + 1}`} />
        </div>
        
      </div>
    );
  };
  
  export default ImageSlider;
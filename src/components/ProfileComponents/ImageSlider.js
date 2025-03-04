"use client"

import "../../style/profile-styles.css";
import React from "react";
import CurrentImageIndicator from "./CurrentImageIndicator.js";

export default function ImageSlider(props) {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    return (
        <div className="image-slider-container">
            <div className="image-viewport">
                <img className="profile-image" src={props.images[currentImageIndex]} alt={props.name} />
                <p onClick={() => cycleImageLeft(props.images, currentImageIndex, setCurrentImageIndex)} className="button button-left">&lt;</p>
                <p onClick={() => cycleImageRight(props.images, currentImageIndex, setCurrentImageIndex)} className="button button-right">&gt;</p>
            </div>
            <br/>
            <CurrentImageIndicator numDots={props.images.length} currentImageIndex={currentImageIndex}/>
        </div>
    );
}

function cycleImageLeft(images, currentImageIndex, setCurrentImageIndex) {
    if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
    } else {
        setCurrentImageIndex(images.length - 1);
    }
}

function cycleImageRight(images, currentImageIndex, setCurrentImageIndex) {
    if (currentImageIndex < images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
    } else {
        setCurrentImageIndex(0);
    }
}
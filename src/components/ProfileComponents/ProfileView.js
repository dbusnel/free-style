"use client"

import "../../style/profile-styles.css";
import React from "react";
import ImageSlider from "./ImageSlider.js";
import CommentSection from "./CommentSection";

export default function ProfileView(props) {
    return (
        <div className="profile-view-container outline-container">
            <h1>{props.name}</h1>
            <p>{props.bio}</p>
            <ImageSlider bio={props.bio} images={props.images} />
            <CommentSection />
        </div>
    );
}